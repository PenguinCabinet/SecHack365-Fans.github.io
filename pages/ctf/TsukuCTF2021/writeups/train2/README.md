---
title: train2
description: 2つ目の駅のホームですが，こちらは情報量が少ないです．
author: ryusei_ishika
genre: OSINT
solver: 60
point: 100
---

# train2

> 今いる駅名を答えてください．駅名は漢字で答えてください．例: 京都駅の場合は`TsukuCTF{京都}`がフラグになります．

画像に「出町」という文字があるので，「出町 駅」で検索すると「出町柳駅」がヒットします．出町柳を検索しても，画像とは違う駅なので，その前後の駅を確認すると，元田中駅が画像の駅であることがわかります．

[https://www.google.com/maps/@35.0349579,135.7813721,3a,75y,23.08h,77.26t/data=!3m8!1e1!3m6!1sAF1QipPvDFkrjpzyAn7HUon6fOL_bbH6HR48-q9DjxV3!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPvDFkrjpzyAn7HUon6fOL_bbH6HR48-q9DjxV3%3Dw203-h100-k-no-pi-2.9665244-ya241.67862-ro-1.0298401-fo100!7i5376!8i2688](https://www.google.com/maps/@35.0349579,135.7813721,3a,75y,23.08h,77.26t/data=!3m8!1e1!3m6!1sAF1QipPvDFkrjpzyAn7HUon6fOL_bbH6HR48-q9DjxV3!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPvDFkrjpzyAn7HUon6fOL_bbH6HR48-q9DjxV3%3Dw203-h100-k-no-pi-2.9665244-ya241.67862-ro-1.0298401-fo100!7i5376!8i2688)

![home.jpeg](./home.jpeg)

```txt
TsukuCTF{元田中}
TsukuCTF{元田中駅}
TsukuCTF{もとたなか駅}
```