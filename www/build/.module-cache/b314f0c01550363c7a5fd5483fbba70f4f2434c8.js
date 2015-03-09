React.render(
  React.createElement("h1", null, "hello react"),
  document.getElementById('example')
);

var CommentBox = React.createClass({displayName: "CommentBox",
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        "I am a CommentBox."
     )
    );
  }
});

React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);