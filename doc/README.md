## Web 题目部署方案

- [方法1使用带有域名的来访问Web挑战](#方法1使用带有域名的来访问Web挑战)
- [方法2不使用域名,直接使用IP访问Web挑战](#方法2不使用域名,直接使用IP访问Web挑战)

### 方法1使用带有域名的来访问Web挑战

端口 和域名
![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/c0fe82d0-0ccf-4f1b-9290-437b2f71e27d)

frp 配置文件 端口 和域名
![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/0bedf942-797b-4065-9392-6c1cdcd87324)

然后是 docker-compose.yml
![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/b2afaf93-5447-4ef0-9834-e2cf1e08df37)


创建web动态题的时候这里选 HTTP

![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/b909b54d-1f44-4c83-acc0-7816c441d003)


- 测试开启实例和访问
![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/a1516ea7-9e8f-49cd-bdb4-713e9642e821)

![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/ff620c45-de07-435a-9f98-8b38455b3dbd)



### 方法2不使用域名,直接使用IP访问Web挑战

- 创建题目的时候 `Frp Redirect Type` 可以直接选择 `Direct` ,也可以正常使用，
![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/c06f747f-fe34-472e-830a-11d5b4c264bb)

- 建议在 tags 里 加一个 web ,这样的话，启动实例时返回的就是 http://ip:port了

![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/8c587cf4-ff9a-40b4-946c-edb65066d766)
![image](https://github.com/imLZH1/ctfd_whale_pages/assets/60182298/ccf2909a-25c2-45ac-a66a-9a262cfdbbf3)


