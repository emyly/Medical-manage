/**
 * Created by wmt on 2016/12/12.
 */
import React, { Component, PropTypes } from 'react';

export default class ProcurementReview extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    )
  }
}
