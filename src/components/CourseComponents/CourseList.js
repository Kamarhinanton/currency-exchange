import React from 'react';
import style from './courseList.module.scss';
import {useState} from "react";

const CourseList = (props)=> {
    let [valueFirst, setValueFirst] = useState('');
    let [valueLast, setValueLast] = useState('');

    let firstSelectValue = React.createRef();
    let lastSelectValue = React.createRef();

    const reverseLogic = false;

    const changeInputFirst = (e) => {
        let changingValue = e.currentTarget.value * (lastSelectValue.current.value / firstSelectValue.current.value );
        setValueLast(valueLast = e.currentTarget.value)
        setValueFirst(valueFirst = changingValue)
    }

    const changeInputLast = (e) => {
        let changingValue = e.currentTarget.value * (firstSelectValue.current.value / lastSelectValue.current.value);
        setValueFirst(valueFirst = e.currentTarget.value)
        setValueLast(valueLast = changingValue)
    }

    const changeSelectFirst = (e) => {
        let changingValue = valueFirst * (e.currentTarget.value / lastSelectValue.current.value);
        setValueLast(valueLast = changingValue)
    }

    const changeSelectLast = (e) => {
        let changingValue = valueLast * (e.currentTarget.value / firstSelectValue.current.value);
        setValueFirst(valueLast = changingValue)
    }

    return (
      <section className={style.courseContainer}>
          <div>
              <input placeholder='0' onChange={changeInputLast} value={valueFirst}  type="number"/>
              <select onChange={changeSelectFirst} ref={firstSelectValue}>
                  <option value={props.courseUSD}>USD</option>
                  <option value={props.courseEUR}>EUR</option>
                  <option value={1}>UAH</option>
              </select>
          </div>
          <div>
              <input placeholder='0' onChange={changeInputFirst} type="number" value={valueLast}/>
              <select onChange={changeSelectLast} ref={lastSelectValue}>
                  <option value={1}>UAH</option>
                  <option value={props.courseUSD}>USD</option>
                  <option value={props.courseEUR}>EUR</option>
              </select>
          </div>
      </section>
    )
}

export default CourseList;