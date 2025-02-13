---
title: TakaiTakai
description: 高いビルから撮影された画像から撮影地を特定します
author: ryusei_ishika
genre: OSINT
solver: 53
point: 473
---

# TakaiTakai

画像内の特徴的な建物を2つ特定して、それぞれの位置関係を用いて撮影場所を特定します。Google Lensを用いると「[代官山アドレス ザ・タワー](https://skyscraperclub.com/?p=2423)」と「[中目黒GT（ゲートタウン）タワー](https://skyscraperclub.com/?p=2611)」を特定することができました。

![](./images/%E4%BB%A3%E5%AE%98%E5%B1%B1%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9.png)

![](./images/中目黒GT.png)

次に3D表示ができるマップサービスを用います。Google Mapを使用しても良いのですが、ここでは細かい位置調整が可能な[Google Earth Pro](https://support.google.com/earth/answer/21955?hl=ja) (無料)を使用します。

まずは先ほど特定した二点を画面内に収めます。

![](./images/1.png)

画像の位置関係を捉えたまま少しずつ建物から距離を離していきます。

![](./images/2.png)

すると手前の建物が一致することから、渋谷ソラスタであることがわかりました。

![](./images/3.png)

このように視界が開けた写真から場所を特定する方法としてはいくつかありますが、他にも一点透視図法を用いた方法なども存在します。ここでは詳しく説明しませんが、以下の動画などで詳しく解説されています。

[【特定厨】写真から自宅を特定する方法 (ラムダ技術部)](https://www.youtube.com/watch?v=9ZgEEkUPL00)

最後に、渋谷ソラスタの開業日を調べると、2019年3月29日であることがわかりました。

## TsukuCTF22{2019/3/29}
