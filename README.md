# Zichron Menachem Blood Components App

## The Need

Thousands of Israelis need platelet donations to survive and fight cancer,
chronic diseases, or traumatic injuries.

Platelets are colorless cell fragments called thrombocytes. Their main function
is to stick to the lining of blood vessels and stop bleeding.

The process of clotting begins if one of your blood vessels gets damaged. The
vessel sends out signals that are picked up by platelets. The platelets then
rush to the site of damage and form a plug, or clot, to repair the damage.

Many lifesaving medical treatments for patients require platelet transfusions:
Cancer patients, those receiving organ or bone marrow transplants, victims of
traumatic injuries, and patients undergoing open heart surgery. Platelets must
be transfused within just 5 days after donation - so there is a constant, often
critical need for new and current donors to give to keep up with hospital
demand.

## The Apps

Zichron Menachem volunteers are in touch with hundreds of potential platelet donors daily,
and help to coordinate between them, and the hospitals where the donation machines are located.

These 2 apps were created in order to help them with this sacred task:

- `ZM-Coordinator` app lets the coordinators add available appointments and monitor new bookings.
- `ZM-Donor` app lets the donors see all available appointments and easily sign up to a donation.

## Zichron Menachem Background

Zichron Menachem provides support for any young person in Israel under the age
of 25 living with cancer, as well as their parents and siblings.

Families of all religions and backgrounds turn to Zichron Menachem for the help
they need most, be it information, a second opinion from our “clinic of hope”,
or a break from the punishing routine of medical appointments.

Zichron Menachem works closely with Israel’s leading medical professionals, who
strongly believe that no child can be treated comprehensively without the
support we provide.

## App Description

This mobile web app, will allow donors to view information about available dates
and times for donations, self-register to a donation appointment, and be
specifically targeted for emergency requests if he is suitable for a new raised
request.

#### Porposes:

- Managing the donations processes in one central efficient application.
- Increasing donors' involvement and donors' community.
- Shortening period between emergency request till suitable donor is found.
- Make more efficient the process of managing routine donations scheduling.
- Target audience are donors and potential donors, ages 17-65, from all
  locations in Israel and any background.

## Installation

<!-- ![](https://i.imgur.com/19mCLmm.png) -->

1. Clone the repo
   `git clone git@github.com:startach/ZM-BloodComponents.git`
2. Install the required dependencies
   `yarn install`
3. Build the common package
   `yarn run build-common`
4. To start the Donor app:
   `yarn run start-donor`
5. To start the Coordinator app:
   `yarn run start-coordinator`

## Before merging

To manage our development environment some automatic tests 
are triggered with each pull request. 
Run this steps locally to make sure they will pass:

1. Fix code styling 
   `yarn run style`
2. Test [storybook snapshots](https://github.com/storybookjs/storybook/tree/main/addons/storyshots/storyshots-core)
   `yarn run test-donor` or `yarn run test-coordinator` 
   (depends on which package you have worked on)
3. If some test failed, it means the code changes effected the UI. 
    Make sure they didn't change any component that they weren't supposed to and update them with
   `test-update-donor` or `test-update-coordinator`

ENJOY!
