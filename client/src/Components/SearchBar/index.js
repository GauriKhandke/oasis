import React,{ useState } from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

export default function ReactDropDown()  {

const [year, setYear] = useState();
const [month, setMonth] = useState();

    return (
      <div>
        <YearPicker
          defaultValue={'select year'}
          start={2010} // default is 1900
          end={2030} // default is current year
          reverse // default is ASCENDING
          required={true} // default is false
          disabled={true} // default is false
          value={year} // mandatory    
          onChange={() =>
            setYear({year})
          }
          id={'year'}
          name={'year'}
          classes={'classes'}
          optionClasses={'option classes'}
        />
        <MonthPicker
          defaultValue={'select month'}
          numeric // to get months as numbers
          short // default is full name
          caps // default is Titlecase
          endYearGiven // mandatory if end={} is given in YearPicker
          year={this.state.year} // mandatory
          required={true} // default is false
          disabled={true} // default is false
          value={month} // mandatory
          onChange={() => {
            setMonth({ month })
          }}
          id={'month'}
          name={'month'}
          classes={'classes'}
          optionClasses={'option classes'}
        />
      </div>
    );
  }

