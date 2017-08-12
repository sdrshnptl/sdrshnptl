---
layout: post
title:	Jekyll markdown page build
date:	2017-04-21 9:30:00 +0530
categories: WebDevelopmentJekyll
comments: true
---

Every time while building this site offline, i have to execute this commands, 
<!-- more -->
for starting jekyll server 
```
bundle exec jekyll serve --incremental
```  
this commant has to execute.

To simplify this process here, "Batch file" programming is used. 

1. Type following in in text editor
```
start http://localhost:4000
bundle exec jekyll serve --incremental
```
2. Save this file as  ```deploy.bat```


3. To test markdown file and starting server, click on "deploy.bat".
	localhost:4000 will be open in browser and live file compilation started.

4. Keep the command promt open, while it's serving localhost.


![alt text](/images/jekyll.jpg "Jekyll compilation")

