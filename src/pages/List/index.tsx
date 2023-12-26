import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useState } from 'react';
import useUserModel from '../../hooks/useUserModel'; // 수정된 부분
import MonthlyDateSelector from '../../components/MonthlyDateSelector';
import useMonthlyDateHandler from '../../hooks/useMonthlyDateHandler';

const List = () => {
  const { targetDate, onLeftClick, onRightClick } = useMonthlyDateHandler(
    new Date()
  );

  const user = useUserModel(
    new Date(targetDate.getFullYear(), targetDate.getMonth(), 1),
    new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)
  );
  console.log('user:', user);

  const dateArray = [];
  for (
    let date = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    date <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    date.setDate(date.getDate() + 1)
  ) {
    dateArray.push(new Date(date));
  }
  console.log(dateArray);

  const [selectedValue, setSelectedValue] = useState('');

  const radioCategoryButtonInfo: InputButtonInfo = {
    type: 'shortOvalRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['운동', '식단'],
    backgroundColor: 'white',
    border: 'primary',
    color: 'black',
    fontWeight: 'bold',
    onChange: (selectedCategory) => {
      console.log('선택된 값:', selectedCategory);
      setSelectedValue(selectedCategory);
      // TODO - 선택된 운동/식단에 따른 로직 작성
      if (selectedCategory === '운동') {
        console.log('운동');
      } else {
        console.log('식단');
      }
    },
  };

  return (
    <>
      <Header></Header>

      <RadioBtnContainer>
        <RadioButton info={radioCategoryButtonInfo}></RadioButton>
      </RadioBtnContainer>

      <WeeklyContainer>
        <MonthlyDateSelector
          targetDate={targetDate}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />
      </WeeklyContainer>

      <AllRoutineCardContainer>
        {selectedValue === '운동' && (
          <>
            {dateArray.map((date, index) => (
              <RoutineCardContainer key={`exercise-${index}`}>
                <RoutineCard
                  key={`exercise-${index}`}
                  type="exercise"
                  exerciseList={user?.userExerciseList}
                  date={date}
                ></RoutineCard>
              </RoutineCardContainer>
            ))}
          </>
        )}
        {selectedValue === '식단' && (
          <>
            {dateArray.map((date, index) => (
              <RoutineCardContainer key={`food-${index}`}>
                <RoutineCard
                  key={`food-${index}`}
                  type="food"
                  foodList={user?.userFoodList}
                  date={date}
                ></RoutineCard>
              </RoutineCardContainer>
            ))}
          </>
        )}
      </AllRoutineCardContainer>
    </>
  );
};

const RadioBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const WeeklyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const RoutineCardContainer = styled.div`
  margin: 10px 0;
`;

const AllRoutineCardContainer = styled.div`
  width: 50%;
  margin: auto;
`;

export default List;
