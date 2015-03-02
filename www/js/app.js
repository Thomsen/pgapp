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