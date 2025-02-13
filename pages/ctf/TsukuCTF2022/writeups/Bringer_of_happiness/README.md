---
title: Bringer_of_happiness
description: 黄色の列車と看板、建物から撮影場所を探す問題
author: labo_4423
genre: OSINT
solver: 75
point: 446
---

# Bringer_of_happiness

まず、左側に「ジオパーク」の4文字が見えるので「ジオパーク」で検索して日本のジオパークの場所(9箇所)を把握します。  
https://geopark.jp/geopark/about/  

また、写真に黄色の電車が写っているので、次に「（ジオパークの地名）　黄色　電車」とかで各ジオパークの場所で走っている電車のフロント部分を調べていくと「島原　黄色　電車」みたいな感じで調べると問題の画像と同じ形状の電車（島原鉄道）がヒットすると思います  
https://www.city.shimabara.lg.jp/page17481.html

これでこの場所が島原鉄道の沿線の駅周辺ということがわかります。また写真にパチンコの旗が写っているので駅の奥にある大きな建物はパチンコ店であることが推測できます。なので「島原　駅　パチンコ」とかで調べると写真右上に写っている紫色の看板と似たパチンコ店を見つけることができます。  
もしくは島原鉄道のホームページから各駅の外観の写真を見ていくと問題の写真と似たような画像を見つけることができると思います。  
https://www.shimatetsu.co.jp/area/detail/?id=1
以上より、この写真は島原港駅周辺で撮影されたことがわかります。あとは撮影された角度から撮影場所を特定して緯度と経度を調べます。  

## 補足

幸せの黄色いハンカチや海に近い駅などで、有名な大三東駅もこの島原鉄道の沿線にあります。（大三東駅は有名なので敢えて別の駅にしました）  
https://www.shimatetsu.co.jp/infos/detail/?id=385  
またカフェトレインもやっていて車内でランチやスイーツも楽しめるそうです。料金も大人6,000円で割とリーズナブルなのでデート等にも良さそうですね。 


We can see "ジオパーク"(GeoPark) in the left. According to Japanese Geoparks Network, there are 9 GeoParks in Japan. 
https://geopark.jp/en/

And There is a yellow train. By searching "<<<GeoPark Name>>> Train Yellow", you can know this is Shimabara Railway.

So This photo must be a station of Shimabara Railway. As you can see there is a flag "パチンコ"(pachinko), the big building behind the station is a pachinko parlor. You'll find this parlor if you google "Shimabara Station Pachinko" or something like that.
Or you can also find the similar picture from Simabara Railway official website.
https://www.shimatetsu.co.jp/area/detail/?id=1

Now you know that this photo is taken near Shimabarako Station. Finally, detect the right place based on the angle of the photo and you can know the exact latitude and longitude.

## Tips
Shimabara Railway stops Omisaki Station, which is known as the station by the sea and also famous for The Yellow Handkerchief.
(We picked the other station because Omisaki is very famous)
https://www.shimatetsu.co.jp/infos/detail/?id=385  
We can also enjoy having lunch and snacks in the train which is called Cafe-Train. The fee is 6000 JPY. How about a date?