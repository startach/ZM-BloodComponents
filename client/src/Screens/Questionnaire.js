import React from 'react'
import ScreenContainer from '../components/screen'
import QuestionnaireList from '../components/Questionnaire/Questionnaire'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

const Questionnaire = () => {
    return (
        <ScreenContainer>
            <MenuHeader title="Questionnaire" icon='backArrow'></MenuHeader>
            <QuestionnaireList />
            <BottomNavBar />
            <div className="footer"></div>
        </ScreenContainer>
    )
}

export default Questionnaire
