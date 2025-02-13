---
title: Robot
description: 中国の大学
author: labo_4423
genre: OSINT
solver: 33
point: 490
---

# Robot

看板の表記からおそらく中国語であることがわかる。しかし、中国にはグレート・ファイアウォールと呼ばれる中国本土のインターネットを覆う大規模情報検閲システムにより、Google等のウェブサイトはブロックされています。そこでグレート・ファイルウォールの影響を受けないウェブサイトを利用します。（ここでは"百度"と呼ばれる中国最大の検索エンジンを利用します）
https://www.baidu.com/  
そして、下記の画像のように配布された画像の看板に書かれている文字を検索をかけます。  
https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&dyTabStr=MCw2LDQsNSwzLDEsNyw4LDIsOQ%3D%3D&word=%E5%8D%8E%E5%B7%A5%E6%A9%9F%E5%99%A8%E4%BA%BA%E5%88%9B%E6%96%B0%E5%9F%BA%E5%9C%B0  
すると、配布された画像に書かれていた看板と同じ文字が書かれている看板を見つけることができます。（中国語表記の文字は翻訳サイト等で翻訳したり、百度の検索欄に日本語で検索すると中国語表記に変換された検索結果が出てくるので、そこから文字をコピペするとかしてください）
![Robot_writeup.png](./Robot_writeup.png)  

「華南理工大学」という文字が見えるので写真が撮影された場所は華南理工大学だと考えられます。そして華南理工大学のホームページ（英語版）で英語での表記名を調べます。
https://www.scut.edu.cn/en/  

```txt
TsukuCTF22{South China University of Technology}
```

## 余談

これは作問者がCovid-19流行前に華南理工大学のRoboMasterチームを訪問したときに撮影したときのものです。（RoboMasterについては下記のリンクを参照）  
https://www.robomaster.jp/  

本当に余談ですが、RoboMasterを主催しているDJIのバッテリーはロボコン等で使い勝手がいいです
