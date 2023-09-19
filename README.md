# ctfd_whale_pages

* CTFd v3.6.0 + ctfd-whale + ctfd-pages-theme 


‍

‍

## Docker 安装

‍

```python
sudo apt install docker
sudo apt install docker-compose
```

‍

‍

## 需要配置哪些？

‍

‍

* 端口范围

‍

​![image](image-20230920042250-cotz2cn.png)​

‍

‍

* docker加速

```python
/etc/docker/daemon.json 

{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

‍

## 初始化集群

‍

```python
sudo docker swarm init
sudo docker node update --label-add='name=linux-1' $(sudo docker node ls -q)
```

​![image](image-20230920042406-kbsxzt3.png)​

‍

‍

## CTFd ！启动

‍

```pytthon
sudo docker-compose up -d
```

​![image](image-20230920042620-jes8gsf.png)​

‍

## 打包好的

‍

```python
git clone https://github.com/imLZH1/ctfd_whale_pages.git
cd ctfd_whale_pages
docker-compose up -d

```

‍

启动好后 用 admin:admin 登录后台 config->reset 清除数据，然后你就可以自己配置啦·？

‍

* 交流群

```python

蔡徐坤篮球协会 信息部
QQ: 591613671
```

‍
