---
title: Legacy code
description: レガシーマシンのアセンブリ言語プログラムを読み解く
author: T_taisyou
genre: Rev
solver: 7
point: 484
---

# Legacy code
## 解法1
プログラムの命令を全部追わなくても推測でFLAGがわかる。  

まず、標準出力を回答せよという問題であることに加え、
49行目~53行目あたりでprintfしようとしているコードが読み取れるので、恐らくここで表示される文字列が答えになるのかなとあたりを付ける。  

```txt
	pushw	-2(%bp)
	pushw	$.LC0
	pushw	%ss
	popw	%ds
	call	printf
```

表示しようとしている `.LC0` には以下のように書式文字列が格納されているので、これが表示されるのだなと理解する。  

```txt
.LC0:
	.string	"PC%d%.0f\n"
```

`%d%.0f` に何の数字が入るかが問題である。  
`%d` に入る数字は、先程見たprintf call前にある `pushw	-2(%bp)` から `-2(%bp)` に代入されている数字が表示されるんだろうと考えコードを辿ってみると、`-2(%bp)`に値を代入しているのは14行目のここだけだと気づく。  

```txt
	movw	$9,	-2(%bp)
```

即値で整数の9を代入しているので `%d` に表示されるのは `9` であることがわかる。  
ここまででフラグの文字列の頭は `PC9` であるというところまでわかる。  

次に `%.0f` の部分に入る数字を考える。  
浮動小数点数が入りそうだ。  
尚且、浮動小数の計算を行っているのはFPUを使った以下の部分だけなので、ここの計算結果がわかれば恐らくはそれが出力されているのだろうと推測できる。  

```txt
	finit
	fld	-10(%bp)
	fld	-14(%bp)
	faddp	%st(0), %st(1)
	fstp	-6(%bp)
	fwait
```

`-10(%bp)` と `-14(%bp)` に格納されている数字をロードし、
`faddp	%st(0), %st(1)` で足し合わせて、その答えを `fstp	-6(%bp)` で `-6(%bp)` に格納していることがわかる。  
計算内容(足し算をしているだけ)がわかったので、後は計算に使われている２つの値である `-10(%bp)` と `-14(%bp)` に格納されている数字がわかればほぼ勝ちである。  

`-10(%bp)` と `-14(%bp)` に値を代入しているのはここらへんっぽいが、なにがどういう組み合わせで入っているかわからない。(`movw`使ってるしおおよそ予想はつくかもしれないが...)

```txt
	movw	$0x28A4, -10(%bp)
	movw	$0x4448, -8(%bp)
	movw	$0xE148, -14(%bp)
	movw	$0x3EBA, -12(%bp)
```

厳密に順を追って上記の値の形式を推測すると、  
FPUのロード命令は `fld` が使われていることから、計算に使われている値はどちらも `float` 型であることがわかる。(`double`型の値をロードするには `fldl` 命令を使う必要がある)  
よって、値は32bitで扱われているはずだ。  

そしてもう一つ、ファイル先頭のアーキテクチャとコードのビット幅指定から、このアセンブリ言語プログラムは16bitマシン(Intel 80286ターゲット)で書かれていることがわかる。  

```txt
	.arch i286,jumps
	.code16
```

16bitマシンではもちろんレジスタは16bitだし、値のやり取りも最大16bitで行われていることがわかる(`movw`は16ビットのデータのmov命令なので、その時点でわかるが)。  
よって以下のコードは32bitのfloat型の数字を上位16ビットと下位16bitにわけて格納している事がわかる。  

```txt
	movw	$0x28A4, -10(%bp)
	movw	$0x4448, -8(%bp)
	movw	$0xE148, -14(%bp)
	movw	$0x3EBA, -12(%bp)
```

上司に教えてもらった[Webサイト](https://silight.hatenablog.jp/entry/2016/08/23/212820)で16進数から小数表現に変換すると以下のようになります。  

```txt
4448 28A4 -> 800.635009765625
3EBA E148 -> 0.36500000953674316
```

これらを足し合わせると`801.0000097751617`になるが、書式文字列のフォーマット指定子は`%.0f`なので、表示されるのは`801`になる。  
先にわかっていたフラグの頭と繋げると `PC9801` という文字列が標準出力されることが推測できる。  

## 解法2
Reversingではなくなってしまいますが、アセンブルしてPC-98x1実機とかエミュレータとかその他レトロマシンで実行するともちろんフラグが表示されます。(元々このコードは自宅のPC-9801 DX U2で動作させるプログラムとして書いた)  

# フラグ

```txt
TsukuCTF{PC9801}
```