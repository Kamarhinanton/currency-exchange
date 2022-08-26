import {connect} from 'react-redux';
import CourseList from './CourseList';

const CourseContainer = (props) => {
    return (
        <CourseList courseUSD = {props.courseUSD} courseEUR = {props.courseEUR}/>
    )
}

let mapStateToProps = (state) => {
    return {
        courseUSD: state.courseContent.courseUSD,
        courseEUR: state.courseContent.courseEUR
    }
}

export default connect(mapStateToProps)(CourseContainer);

