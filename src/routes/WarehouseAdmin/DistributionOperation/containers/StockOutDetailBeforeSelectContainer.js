/**
 * Created by wangming on 11/18/2016.
 */

import { connect } from 'react-redux';

import StockOutDetailBeforeSelect from '../components/StockOutDetailBeforeSelect';

import {
  getTemporaryStorage,
} from '../modules/stockOutDetailBeforeSelect';

const mapDispatchToProps = {
  getTemporaryStorage,
};

const mapStateToProps = state => ({
  stockOutDetailBefore: state.distributionOperation.stockOutDetailBefore
});

export default connect(mapStateToProps, mapDispatchToProps)(StockOutDetailBeforeSelect)

