/*
 Navicat Premium Data Transfer

 Source Server         : 测试数据库
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : zane_web_front

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 09/30/2017 16:11:29 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `web_article`
-- ----------------------------
DROP TABLE IF EXISTS `web_article`;
CREATE TABLE `web_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `describes` varchar(1500) DEFAULT NULL COMMENT '描述',
  `text` text CHARACTER SET utf8mb4 NOT NULL COMMENT '文章内容',
  `author` varchar(15) DEFAULT NULL COMMENT '文章作者',
  `browse` smallint(6) DEFAULT '0' COMMENT '浏览量',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `tagid` int(11) DEFAULT NULL COMMENT '分类ID',
  `isOnline` tinyint(1) DEFAULT '1' COMMENT '上下架  1：上架  0：下架',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `web_article`
-- ----------------------------
BEGIN;
INSERT INTO `web_article` VALUES ('1', '如何把 Callback 接口包装成 Promise 接口', '前端开发尤其 Node.js 开发中，经常要调用一些异步接口，如：文件操作、网络数据读取。而这些接口默认情况下往往是通过 Callback 方式提供的，即：最后一个参数传入一个回调函数，当出现异常时，将错误信息作为第一个参数传给回调函数，如果正常，第一个参数为 null，后面的参数为对应其他的值。', '<pre><code>&lt;div id=\"name\"&gt;\n    我就死我\n        &lt;div&gt;我就是我&lt;/div&gt;\n&lt;/div&gt;</code></pre><p>?<br></p>', 'zane', '226', '2017-09-12 10:07:44', '2', '1'), ('2', 'Webpack 打包优化之体积篇', '<p>000</p>', '<pre><code>// 不和规范的json 转换成符合规范的JSON\n	toJson(json) {\n		let copyJson = json;\n		if (!copyJson) return;\n		// 替换不正常的 { 号\n		copyJson = copyJson.replace(/｛/g, \'{\')\n		// 替换不正常的 } 号\n		copyJson = copyJson.replace(/｝/g, \'}\')\n		// 替换不正常的 : 号\n		copyJson = copyJson.replace(/：/g, \':\')\n		// 去掉所有的空格\n		copyJson = copyJson.replace(/s/g, \'\')\n		// 替换所有的 引号\n		copyJson = copyJson.replace(/[\'‘“’”]/g, \'\"\')\n		// 替换value值中的双引号\n		copyJson = copyJson.replace(/\"(?=([ws-_d.*u4E00-u9FA5uf900-ufa2d]+?))/g, \'’\')\n		// 替换不正常的 , 号\n		copyJson = copyJson.replace(/[，]/g, \',\')\n		// 替换 undefined 为字符串\n		copyJson = copyJson.replace(/[\"\']?undefined[\"\']?/g, \'\"undefined\"\')\n\n		try {\n			// 若正常直接返回\n			JSON.parse(copyJson);\n			return copyJson;\n		} catch (err) {\n			// 不正常开始替换\n			copyJson = copyJson.replace(/{\"?([u4E00-u9FA5uf900-ufa2d\'\"dw_-]*?)\"?:/g,($a,$b)=&gt;{\n				return `{\"${$b}\":`;\n			}) \n			copyJson = copyJson.replace(/,\"?([u4E00-u9FA5uf900-ufa2d\'\"dw_-]*?)\"?:/g,($a,$b)=&gt;{\n				return `,\"${$b}\":`;\n			})\n			\n			return copyJson\n		}\n	};</code></pre><p><br></p>', 'zane', '275', '2017-09-12 17:54:03', '3', '1');
COMMIT;

-- ----------------------------
--  Table structure for `web_comment`
-- ----------------------------
DROP TABLE IF EXISTS `web_comment`;
CREATE TABLE `web_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) DEFAULT NULL COMMENT '文章ID',
  `articleName` varchar(100) DEFAULT NULL,
  `pageId` int(11) DEFAULT NULL COMMENT '单页面ID',
  `pageName` varchar(50) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL COMMENT '评论时间',
  `text` tinytext CHARACTER SET utf8mb4 NOT NULL COMMENT '评论的内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `web_comment`
-- ----------------------------
BEGIN;
INSERT INTO `web_comment` VALUES ('1', '1', '如何把 Callback 接口包装成 Promise 接口', null, null, '2017-09-12 10:03:06', '<p>hjkhjk</p>'), ('2', '1', '如何把 Callback 接口包装成 Promise 接口', null, null, '2017-09-12 10:06:28', '<p>?<br></p>');
COMMIT;

-- ----------------------------
--  Table structure for `web_link`
-- ----------------------------
DROP TABLE IF EXISTS `web_link`;
CREATE TABLE `web_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `linkName` varchar(30) DEFAULT NULL COMMENT '友情链接名称',
  `lineHref` varchar(100) DEFAULT NULL COMMENT '友情链接URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `web_link`
-- ----------------------------
BEGIN;
INSERT INTO `web_link` VALUES ('2', '汪微SEO', 'v.seosiwei.com');
COMMIT;

-- ----------------------------
--  Table structure for `web_onepage`
-- ----------------------------
DROP TABLE IF EXISTS `web_onepage`;
CREATE TABLE `web_onepage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageName` varchar(50) DEFAULT NULL COMMENT '页面标题',
  `pageText` text CHARACTER SET utf8mb4 COMMENT '单页内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `web_onepage`
-- ----------------------------
BEGIN;
INSERT INTO `web_onepage` VALUES ('1', '联系我水电费', '<p><font color=\"#c24f4a\">备注：本博客的所有文章仅表示博主的个人观点，有错误或改进的地方希望大家多多指教!</font><br></p><h1>个人介绍</h1><p>我是一名WEB前端爱好者，现在的职位当然就是WEB前端工程师了！ 级别不高，粗略的估计了下 算的上是个中级吧。 在我眼中 前端：是一个未来发展很好的一个职业，互联网改变了我们的生活，学习和工作 而在整个互联网中起到举足轻重的当然就属于那些一个一个的WEB站点， 以前的互联网是PC端的主角，现在到未来会是移动互联网的时代，而这只会是愈演愈烈的趋势， 移动互联网包括了移动WEB网页和WEBAPP,而这两者都是WEB前端工程师展现拳脚的好平台。 而我有幸选择了这个职业</p><h1>开发项目</h1><ul><li>node.js</li><li>react.js</li></ul><h1>现属公司</h1><p>深圳市启明星电子商务有限公司<br></p><p></p>');
COMMIT;

-- ----------------------------
--  Table structure for `web_tags`
-- ----------------------------
DROP TABLE IF EXISTS `web_tags`;
CREATE TABLE `web_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` varchar(15) DEFAULT NULL COMMENT '标签名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `web_tags`
-- ----------------------------
BEGIN;
INSERT INTO `web_tags` VALUES ('2', 'node.js'), ('3', 'react.js');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
