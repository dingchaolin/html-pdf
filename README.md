# html-pdf
- npm install phantomjs
- npm install html-pdf

# 乱码问题 空白问题
- http://blog.csdn.net/canghai874374808/article/details/60589451
```
在最近的项目中写了一个 Feature，大概的功能是获取一个产品的详情、渲染成 HTML、然后用 html-pdf 生成为 PDF 下载。


这是一个比较简单的功能，但是在今天测试的时候发现了问题：通过测试服务器下载文件「乱码」-- 文字显示都变成了一个个方块，只有数字显示正常，大概长这样：




乱码？
测试服务器是 CentOS，而我之前也没有遇到过这样的问题，因此「乱码」是率先进入我脑海的词汇。


于是乎，我在现有的代码上纠结了很久，主要尝试了下面两种方法：


声明了 Content-type 中的 charset:
res.set('Content-type', 'application/pdf; charset=utf-8');
2.在使用 html-pdf 生成的 Buffer 声明编码：


res.end(buffer, 'utf-8');
当然这两者都于事无补。


此后，搜索的关键词也从"response", "charset", "encoding"，"html-pdf"的排列组合变成了 "CentOS", "html-pdf", "font"。


皇天不负有心人，总算在 Github 上找到了一个相关的 issue: CentOS text does not render :


Solved by install system fonts.
循着这条线索，很快在 StackOverFlow 上找到了解决问题的问题，解决方法如下：


yum install cjkuni-ukai-fonts
这样，生成的 PDF 文件就不再「乱码」了。


当然，也可以安装更完整的中文字体支持，如下：


yum groupinstall "chinese support"
"html-pdf"模块使用的 PhantomJS 模拟 Webkit 访问之前模板生成 HTML 然后用 "Screen Capture" 的方式生成 PDF 文件:


Since PhantomJS is using WebKit, a real layout and rendering engine, it can capture a web page as a screenshot. Because PhantomJS can render anything on the web page, it can be used to convert contents not only in HTML and CSS, but also SVG and Canvas.
```