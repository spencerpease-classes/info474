const React = require('react');

class DataIter extends React.PureComponent {

  constructor(props) {
    super(props);

    const wikiData = this.props.data;
    this.state = {
      dataIter: wikiData.values(),
      iterDelay: 500,
      delayScale: 1
    };

    this.getNextEdit = this.getNextEdit.bind(this);

  }

  componentDidMount() { setTimeout(this.getNextEdit, this.state.iterDelay); }

  componentDidUpdate() { setTimeout(this.getNextEdit, this.state.iterDelay); }

  getNextEdit() {

    const nextVal = this.state.dataIter.next();

    if (!nextVal.done) {

      const edit = nextVal.value;

      const sizeDiff = edit.newlen - edit.oldlen;
      const pos = sizeDiff > 0
      const changeMag = Math.abs(sizeDiff)

      this.props.updateProps({
        numChanges: this.props.numChanges + 1,
        ras: this.props.ras + (pos ? changeMag : 0),
        rds: this.props.rds + (pos ? 0 : changeMag)
      })

    }
  }

  render() { return (null); }

}

module.exports = DataIter;
