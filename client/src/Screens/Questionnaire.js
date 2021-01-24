import React from 'react'
import ScreenContainer from '../components/screen'
import QuestionnaireList from '../components/Questionnaire/Questionnaire'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import {useTranslation} from 'react-i18next';

const Questionnaire = () => {
    const { t } = useTranslation();
    return (
        <ScreenContainer>
            <MenuHeader title={t('screens.questionnaire')} icon='backArrow'></MenuHeader>
            <QuestionnaireList />
            <BottomNavBar />
            <div className="footer"></div>
        </ScreenContainer>
    )
}

export default Questionnaire
