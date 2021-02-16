import React, {useState} from 'react';
import RadioGroup from '../../components/RadioGroup';
import {RadioOption} from '../../components/RadioGroup/RadioGroup';
import DonationInfoIcons from '../../components/DonationInfoIcons';
import {Hospital} from '@zm-blood-components/common';

interface QuestionnaireScreenProps {
  donationData: {
    hospital: Hospital,
    donationDate: Date
  }
  onSuccess?: () => void;
}

export default function QuestionnaireScreen({donationData, onSuccess}: QuestionnaireScreenProps) {

  const [chosen, setChosen] = useState("")



  const radioOptions: RadioOption[] = [
    {value: "value1", label: "label1"},
    {value: "value2", label: "label2"}
  ]

  return (<div>
    <DonationInfoIcons {...donationData}/>
    <RadioGroup
        options={radioOptions}
        value={chosen}
        onChange={setChosen}
        label={"האם תרמת בעבר טרומבוציטים"}
    />
  </div>)
}

