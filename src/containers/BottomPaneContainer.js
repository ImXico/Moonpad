import { connect } from 'react-redux'
import { toggleAlwaysOnTopAndPersist } from '../actions/isAlwaysOnTop';
import BottomPane from '../components/BottomPane/BottomPane';

const mapStateToProps = state => {
  return {
    isAlwaysOnTop: state.isAlwaysOnTop,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAlwaysOnTop: isNowAlwaysOnTop => dispatch(toggleAlwaysOnTopAndPersist(isNowAlwaysOnTop))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPane);