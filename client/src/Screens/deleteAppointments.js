import React from 'react'
import DeleteElements from '../components/deleteAppointments'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function DeleteAppointments () {
    const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title={t('burgerMenu.editAppointments')} icon='burger'></MenuHeader>
                <DeleteElements />
                <BottomNavBar />
            </ScreenContainer>
    )
}

export default DeleteAppointments
