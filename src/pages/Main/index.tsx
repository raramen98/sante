import { useEffect, useRef, useState, useContext } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, Food, User } from '../../types/user';
import styled from 'styled-components';
import useUserModel from '../../hooks/useUserModel';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
const TODAY = '2023-12-08';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';
import {
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
import { MainContext } from './MainContext';
import axios from 'axios';
import { ModalMode } from '../../types/modalMode';
const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';
interface BalckProps {
  height?: string;
}

const Main = () => {
  const today = new Date(TODAY); // 현재 날짜를 가져옵니다.

  const [user, setUser] = useState<User>();
  const startOfThisWeek = startOfWeek(today); // 이번 주의 시작 날짜를 계산합니다.
  const endOfThisWeek = endOfWeek(today); // 이번 주의 종료 날짜를 계산합니다.
  const weeklyUser = useUserModel(startOfThisWeek, endOfThisWeek);
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [isModalFoodOpen, setIsModalFoodOpen] = useState(false);
  const [isModalExerciseOpen, setIsModalExerciseOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [foodId, setFoodId] = useState(null);
  const [foodModalType, setFoodModalType] = useState<ModalMode>('create');

  const [isCreateMode, setIsCreateMode] = useState(true);

  const [startOfCurrentMonth, setStartOfCurrentMonth] = useState(
    startOfMonth(currentDate)
  );
  const [endOfCurrentMonth, setEndOfCurrentMonth] = useState(
    endOfMonth(currentDate)
  );

  const handleDayOnClick = (day: Date) => {
    setCurrentDate(day);
    if (!isSameMonth(day, startOfCurrentMonth)) {
      setStartOfCurrentMonth(startOfMonth(day));
      setEndOfCurrentMonth(endOfMonth(day));
    }
  };

  const closeFoodModal = () => {
    setIsModalFoodOpen(false);
  };
  const closeExerciseModal = () => {
    setIsModalExerciseOpen(false);
  };

  const handleCreateClick = () => {
    setIsCreateMode(true);
    setIsModalFoodOpen(true);
    setFoodModalType('create');
  };

  const handleExerciseCreateClick = () => {
    setIsCreateMode(true);
    setIsModalExerciseOpen(true);
  };

  // "편집하기" 클릭을 처리하는 함수 내부에서
  const handleExerciseEditClick = () => {
    setIsCreateMode(false);
    setIsModalExerciseOpen(true);
  };

  // "편집하기" 클릭을 처리하는 함수 내부에서
  const handleEditClick = (value) => {
    setFoodData(value[0]);
    setFoodId(value[1]);
    setFoodModalType('edit');
    setIsCreateMode(false);
    setIsModalFoodOpen(true);
  };
  //NOTE: mainStatistics는 이번주차 데이터를 불러와야합니다

  useEffect(() => {
    axios
      .post(`${URL}/check`, {
        email: 'email@email.com',
        password: 'sdfdsf',
      })
      .then((response) => {
        const userData = response.data.user;
        console.log(userData);

        setUser({
          ...userData,
        });
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [startOfCurrentMonth, endOfCurrentMonth]);

  return (
    <>
      <MainContext.Provider
        value={{
          closeFoodModal,
          closeExerciseModal,
        }}
      >
        <Header />
        <Blank height="6rem" />
        <Container>
          <DateSelect
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onClick={handleDayOnClick}
          />
          <Blank />
          {isModalExerciseOpen && (
            <ExerciseModal
              modalButton={isCreateMode}
              exerciseData={exerciseData}
            />
          )}
          {isModalFoodOpen && (
            <FoodModal
              modalButton={isCreateMode} // 모달Button 속성으로 상태 전달
              foodData={foodData}
              foodId={foodId}
              modalType={foodModalType}
              // ... 다른 속성들
            />
          )}
          <ContentsContainer>
            <MonthCalendar
              exerciseList={user?.userExerciseList}
              foodList={user?.userFoodList}
              userData={user}
              currentDate={currentDate}
            />
            <CardContainer>
              <RoutineCard
                type="exercise"
                exerciseList={user?.userExerciseList}
                isMain={true}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => {
                  setExerciseData(null);
                  handleExerciseCreateClick();
                }}
                onClickEdit={(value) => {
                  setExerciseData(value);
                  handleExerciseEditClick(value);
                }}
                date={currentDate}
              ></RoutineCard>
              <Blank />
              <RoutineCard
                type="food"
                foodList={user?.userFoodList ?? []}
                isMain={true}
                date={currentDate}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => {
                  handleCreateClick();
                  setIsModalFoodOpen(true);
                }}
                onClickEdit={(value) => {
                  console.log('main data', value[0]);
                  setFoodData(value[0]);
                  handleEditClick(value);
                  setIsModalFoodOpen(true);
                  console.log('이것은 받아온 value', value[0]);
                }}
              ></RoutineCard>
            </CardContainer>
            <MainStatistic user={weeklyUser} todayDate={today} />
          </ContentsContainer>
        </Container>
      </MainContext.Provider>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1160px;
`;

const Blank = styled.div<BalckProps>`
  height: ${(props) => props.height || '2rem'};
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2.5%;
  padding: 2%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const CardContainer = styled.div``;

export default Main;
