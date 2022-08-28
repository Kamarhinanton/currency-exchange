import {connect} from 'react-redux';
import CourseList from './CourseList';
import {getCourse} from "../../redux/course-reducer";

const CourseContainer = (props) => {
    return (
        <CourseList course = {props.course} getCourse = {props.getCourse}/>
    )
}

let mapStateToProps = (state) => {
    return {
        course: state.courseContent.course
    }
}

export default connect(mapStateToProps, {getCourse})(CourseContainer);

