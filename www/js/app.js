React.render(
  <h1>hello react</h1>,
  document.getElementById('example')
);

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        I am a CommentBox.
     </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);

/*
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
*/