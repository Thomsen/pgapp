webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM$harmony */'use strict';

	var React = __webpack_require__(1);

	var Comment = __webpack_require__(2);


	React.renderComponent(React.createElement(Comment, null), document.getElementById('example1'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @jsx React.DOM$harmony */var data = [
	  {author: "Pete Hunt", text: "This is one comment"},
	  {author: "Jordan Walke", text: "This is two comment"},
	  {author: "Pete Hunt2", text: "This is one comment"},
	  {author: "Jordan Walke2", text: "This is two comment"},
	  {author: "Pete Hunt", text: "This is one comment"},
	  {author: "Jordan Walke", text: "This is two comment"},
	  {author: "Pete Hunt2", text: "This is one comment"},
	  {author: "Jordan Walke2", text: "This is two comment"}
	];


	var Comment = React.createClass({displayName: "Comment",
	  handlerJump:function(){
	    window.location.href='test.html';
	  },
	  handleAdd: function() {
	    alert('按钮被点了一下');
	  },
	  render: function() {
	    return (
	        React.createElement("li", {className: "item", onClick: this.handlerJump}, 
	        React.createElement("div", {className: "item-l"}, React.createElement("div", {className: "fl"}, " ", React.createElement("img", {src: "images/header.jpg", className: "avatar"})), 
	        React.createElement("div", {className: "item-r"}, 
	        React.createElement("div", {className: "msg"}, React.createElement("strong", null, "name"), React.createElement("span", null, new Date().toLocaleString())), 
	        React.createElement("div", {className: "content"}, " ", this.props.children)
	        )
	        ), 
	        React.createElement("div", {className: "mybtns"}, React.createElement("button", {className: "mybtn", onClick: this.handleAdd}, "按钮"))
	        )
	    );
	  }
	});

	var CommentList = React.createClass({displayName: "CommentList",
	  render: function() {
	    var commentNodes = this.props.data.map(function (comment) {
	      return (
	          React.createElement(Comment, {author: comment.author}, 
	          comment.text
	        )
	      );
	    });

	    return (
	        React.createElement("div", {className: "commentList"}, 
	        commentNodes

	      )
	    );
	  }
	});

	var CommentBox = React.createClass({displayName: "CommentBox",
	  render: function() {
	    return (
	        React.createElement("div", {className: "commentBox"}, 
	        React.createElement(CommentList, {data: this.props.data})
	        )
	    );
	  }
	});

	module.exports = CommentBox;


/***/ }
]);