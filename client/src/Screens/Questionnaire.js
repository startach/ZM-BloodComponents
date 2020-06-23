import React from 'react'
import ScreenContainer from '../components/screen'
import QuestionnaireList from '../components/Questionnaire/Questionnaire'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

const Questionnaire = () => {
    return (
        <ScreenContainer>

            <div className="header"></div>
            <MenuHeader title="Questionnaire" icon='backArrow'></MenuHeader>
            <QuestionnaireList />
            <BottomNavBar />

        </ScreenContainer>
    )
}

export default Questionnaire
