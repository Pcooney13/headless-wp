function sortColor() {
    const sorted = this.state.posts.sort(function (a, b) {
        var textA = a.color.hsl[0];
        var textB = b.color.hsl[0];
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    this.setState({
        posts: sorted,
    })
}