---
title: GrandpaMemory
description: 実行ファイルを読んでみる。
author: Wagahaiha_toto
genre: Rev
solver: 17
point: 498
---


# GrandpaMemory

今回の問題は、Research UNIX version1上でコンパイルされたPDP-11/20の実行ファイルを人力で逆アセンブルしてみるという問題となる。

## PDPエンディアン

PDP-11では特殊なエンディアンの方式が採用されていた。これは32ビットワードを構成する2つの16ビットワードはビッグエンディアンで格納され、16ビットワードはリトルエンディアンで格納がされる。

詳しくは以下のリンク先を見てほしい。

https://ja.wikipedia.org/wiki/PDP-11

ただし、今回は32ビットのデータを扱っていないため、リトルエンディアンだけ抑えておけば問題ない。

## Research UNIX version1のヘッダー

重要なのは、ヘッダーが終わった12バイト目からプログラムが実行されるということである。
ヘッダーに関して詳しく知りたい場合、以下のリンク先を見てほしい。

https://www.bell-labs.com/usr/dmr/www/man51.pdf

## PDP-11の命令

エンディアンと同様に以下のリンク先が詳しい。

[PDPエンディアン](https://ja.wikipedia.org/wiki/PDP-11#PDP%E3%82%A8%E3%83%B3%E3%83%87%E3%82%A3%E3%82%A2%E3%83%B3)

## 解き方

### PDP-11のバイナリであることを知る

実行ファイルにfileコマンドを行ってみると以下の出力が見られる。

```bash
> file a.out
a.out: PDP-11 old overlay
```

ここからPDP-11のバイナリであることがわかる。

### フラグがある場所を知る

実行ファイルにcatコマンドを行ってみると以下のような出力が見られると思う。

```bash
> cat a.out
4

�
�
�
 �
  �
   �
    �
     B`�passwd is in R2 
```

passwd is in R2 という文字列から最終的な計算結果はR2レジスタに入るとわかる。

### 2進数に変換して出力する

xxdコマンドを利用し、2進数でダンプを行う。

```bash
>  xxd -g 1 -b a.out  
00000000: 00000101 00000001 00110100 00000000 00000000 00000000  ..4...
00000006: 00000000 00000000 00000000 00000000 00000000 00000000  ......
0000000c: 00000001 00001010 00000010 00001010 10000001 00001010  ......
00000012: 10000010 00001010 11000001 00001100 11000001 00001100  ......
00000018: 11000001 00001100 11000001 00001100 11000010 00001100  ......
0000001e: 01000010 01100000 11111111 00000001 01110000 01100001  B`..pa
00000024: 01110011 01110011 01110111 01100100 00100000 01101001  sswd i
0000002a: 01110011 00100000 01101001 01101110 00100000 01010010  s in R
00000030: 00110010 00100000 00000000 00001010                    2 ..
```

このバイナリを読み解いていくのがこの問題となる。

### 実行ファイルを読み解いていく

まず、ヘッダーを取り除く。前述の通りヘッダは12バイトであり、プログラムはヘッダ直後から実行されていくためである。
ヘッダーを取り除くと以下の様になる。(アドレスとasciiコードも取り除いている)

```txt
00000001 00001010 00000010 00001010 10000001 00001010
10000010 00001010 11000001 00001100 11000001 00001100
11000001 00001100 11000001 00001100 11000010 00001100
01000010 01100000 11111111 00000001
```

基本的に16ビットワードを１命令として扱うため、16ビットずつ見ていこう。

#### 00000001_00001010

以下二進数はリトルエンディアンとして1バイト逆に置き換えたものである。

```txt
0000101000 000001
```

上位4ビットに値がないことから2オペンランド命令でないことがわかる。
また、11ビット目が0でないことから無条件分岐命令でないこともわかる。

要するにこれは、1オペランド命令となる。1オペランド命令は上位10ビットが命令コードとなるので0000101000が命令となる。参考リンク先では、8進数で命令コードが表現されているので0000101000を8進数に置き換えると50である。50はCLR命令であるので、レジスタを0クリアしていることがわかる。レジスタは2~0ビットで指定するのでR1を0クリアしていることがわかる。

```txt
CLR R1
```

#### 00000010_00001010

```txt
0000101000 000010
```

前の命令と同じ命令コードなのでCLR命令であることがわかる。また、レジスタは10であるのでR2を示していることがわかる。

```txt
CLR R2
```

#### 10000001 00001010

```txt
0000101010 000001
```

CLR命令と同様に１オペランド命令である。0000101010は8進数で表すと52であり、INC命令であることがわかる。またレジスタはR1を示していることがわかる。

```txt
INC R1
```

#### 10000010_00001010

```txt
0000101010 000010
```

前の命令と同じくINC命令である。レジスタは10であるためR2である。

```txt
INC R2
```

#### 11000001_00001100

```txt
0000110011 000001
```

この命令も1オペランド命令である。11011を8進数にすると63であり、ASR命令であるとわかる。またレジスタはR1である。

```txt
ASR R1
```

また、この命令が4命令続く。

#### 11000010_00001100

```txt
0000110011 000010
```

この命令は前の命令と同じくASR命令であり、レジスタが10であることからR2となる。

```txt
ASR R2
```

#### 01000010_01100000

```txt
0110 000001 000010
```

この命令の場合、11ビット目が0であり、最上位ビットから4ビットにデータがあることから2オペランド命令であることがわかる。2オペランド命令は最上位ビットから4ビットが命令コードを表すので、0110が命令コードとなる。0110を8進数に変換すると、6となる。よってADD命令であることがわかる。また、レジスタは8/~6ビット目と2/~0ビット目がsourceとdestinationを示すので、sourceがR1であり、destinationがR2であることがわかる。

```txt
ADD R1, R2
```

#### 11111111_00000001

```txt
00000001 11111111
```

この命令の場合、11ビット目が0かつ上位7ビットに命令コードがないため条件分岐命令であることがわかる。その場合、参考先のように命令を解釈すると、0000000100000000となり4XXであるとわかる。また、11111111は無条件分岐のオフセットは符号付整数であるため、2の補数表現からマイナスであることがわかる。よって無限ループとなっている。

```txt
BR -1(実際はラベル)
```

#### 結果

今回元となった機械語のプログラムは以下になる。

```asm
/ tukuCTF GrandpaMemory
   clr r1
   clr r2
   inc r1
   inc r2
   asl r1
   asl r1
   asl r1
   asl r1
   asl r2
   add r1, r2
1:
   br 1b


hint:
    <passwd is in R2 \0\n>
```

まず、r1とr2レジスタを0クリアする。その後、r1,r2をインクリメントしr1=1,r2=1とする。また、aslは左シフトで値を2倍にする命令である。よって、計算結果はR2=18となる。

## フラグ

TsukuCTF22{18}
