---
title: Where
description: この写真に移っている場所はどこ?
author: yu1k
genre: OSINT
solver: 98
point: 406
---

# Where

まず、与えられた写真をGoogle画像検索にかけます。中央に渋谷ヒカリエがあるので、渋谷だということがわかりました。

次に、写真中央付近を確認すると渋谷マルイが見えることからこの場所は渋谷駅のハチ公口の方角にカメラを向けて撮影されたということがわかりました。

また、画像にSEIBUの文字が確認できました。写真をよく確認するとSEIBUの建物に渡り廊下が見えました。`西武渋谷 渡り廊下` や `西武渋谷 連絡橋` でGoogle検索すると、この渡り廊下は西武渋谷のA館とB館を接続する連絡通路だということがわかりました。渋谷マルイとの距離感や方角を考えると、このSEIBUの文字が書かれた建物は西武渋谷 A館と特定しました。

Googleマップで渋谷ヒカリエ、渋谷マルイ、西武渋谷 A館の建物の位置を確認し、この写真が撮れそうなビルを探します。

Googleマップのマイマップ機能を利用して渋谷ヒカリエ、渋谷マルイ、西武渋谷 A館にピンをつけます。地図の詳細、地球表示を選択して3D表示にして、先ほどピン留めした建物位置や方角等を照らし合わせストリートビューで渋谷ハチ公口の方角に向かって確認すると、渋谷パルコということを特定しました。

渋谷パルコは1973年6月14日に開業されたので、フラグは `TsukuCTF22{1973/06/14}` です。
