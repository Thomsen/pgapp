/**
 * react列表js
 */

var data = [
  {content: "Pete Hunt"}
];

var Todo = React.createClass({displayName: "Todo",
	                      handleAdd: function() {
		                alert('按钮被点了一下');
	                      },
	                      handlerJump:function(){
		                window.location.href='test.html';
	                      },
                              render: function(){
                                var content = this.props.children;
                                var t = new Date();
                                t = t.toLocaleString();
                                var oi = content.indexOf(' ');
                                var name = ''; 
                                if(oi !== -1){
                                  name = content.slice(0, oi);
                                  content = content.slice(oi+1, content.length);
                                }
                                name = name || 'Anonymous';
                                return (
                                  React.createElement("li", {className: "item",onClick:this.handlerJump}, 
                                                      React.createElement("div", {className: "item-l"}, 
                                                                          React.createElement("div", {className: "fl"}, 
                                                                                              React.createElement("a", {href: "#"}, React.createElement("img", {src: "images/header.jpg", alt: "", className: "avatar"}))
                                                                                             ), 
                                                                          React.createElement("div", {className: "item-r"}, 
                                                                                              React.createElement("div", {className: "msg"}, 
                                                                                                                  React.createElement("strong", null, React.createElement("a", {href: "#"}, name)), 
                                                                                                                  React.createElement("span", null, t)
                                                                                                                 ), 
                                                                                              React.createElement("div", {className: "content"}, content)
                                                                                             )
                                                                         ),
                                                      React.createElement("div", {className: "mybtns"}, 
                                                                          React.createElement("button", {className: "mybtn",onClick:this.handleAdd}, "按钮")
                                                                         )
                                                     )
                                );
                              }
                             });

var TodoForm = React.createClass({displayName: "TodoForm",
                                  handlerSubmit: function(e){
                                    e.preventDefault();
                                    var content = this.refs.content.getDOMNode().value.trim();
                                    if(!content){
                                      alert('不要发布空消息！');
                                      return;
                                    }
                                    //post and callback
                                    this.props.onTodoSubmit({content: content});
                                    this.refs.content.getDOMNode().value = '';
                                    return;
                                  },
                                  render: function(){
                                    return (
                                      React.createElement("form", {className: "clearfix", onSubmit: this.handlerSubmit}, 
                                                          React.createElement("textarea", {name: "content", className: "textarea", ref: "content"}), 
                                                          React.createElement("button", {className: "btn btn-1 fr mr10"}, "发布")
                                                         )
                                    );
                                  }
                                 });

var TodoList = React.createClass({displayName: "TodoList",
                                  render: function(){
                                    var todoNodes = this.props.data.map(function(t){
                                      return (
                                        React.createElement(Todo, null, t.content)
                                      );
                                    });
                                    return (
                                      React.createElement("ul", {className: "list clearfix"}, todoNodes)
                                    );
                                  }
                                 });

var TodoBox = React.createClass({displayName: "TodoBox",
                                 getInitialState: function() {
    	                           //设置组件初始化状态
                                   return {data: []};
                                 },
                                 handlerTodoSubmit: function(t){
                                   var todos = this.state.data;
                                   var newTodos = todos.concat([t]);
                                   this.setState({data: newTodos});
                                   return;
                                 },
                                 render: function(){
                                   return (
                                     React.createElement("div", null, 
                                                         React.createElement(TodoForm, {onTodoSubmit: this.handlerTodoSubmit}), 
                                                         React.createElement(TodoList, {data: this.state.data})
                                                        )
                                   );
                                 }
                                });

//render app
React.render(
  React.createElement(TodoBox, null),
  document.getElementById('example')
);
