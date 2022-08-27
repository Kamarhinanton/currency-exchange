import {connect} from 'react-redux';
import CourseList from './CourseList';
import {getCourse} from "../../redux/course-reducer";

const CourseContainer = (props) => {
    return (
        <CourseList course = {props.course} courseUSD = {props.courseUSD} courseEUR = {props.courseEUR} getCourse = {props.getCourse}/>
    )
}

let mapStateToProps = (state) => {
    return {
        courseUSD: state.courseContent.courseUSD,
        courseEUR: state.courseContent.courseEUR,
        course: state.courseContent.course
    }
}

export default connect(mapStateToProps, {getCourse})(CourseContainer);

