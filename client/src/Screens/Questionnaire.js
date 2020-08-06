import React, { Component } from 'react'
import ScreenContainer from '../components/screen'
import QuestionnaireList from '../components/Questionnaire/Questionnaire'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
// import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';


class Questionnaire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appointmentId: null,
            hospitalID: null
        }
    }

    componentDidMount() {
        //TODO: check if we need this data
        const appointmentId = localStorage.getItem('appointmentId')
        const hospitalID = localStorage.getItem('hospitalID')
        this.setState({ appointmentId, hospitalID })
    }

    render() {
        console.log("Questionnaire -> render -> render", this.state.appointmentId, this.state.hospitalID)
        const { t } = this.props
        return (
            <ScreenContainer>
                <MenuHeader title={t('screens.questionnaire')} icon='backArrow'></MenuHeader>
                <QuestionnaireList />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>
        )
    }
}

export default withTranslation()(Questionnaire)
