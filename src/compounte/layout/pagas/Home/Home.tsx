import WhyChooseUs from "@/compounte/user/AboutNuurul";
import AboutInstitute from "@/compounte/user/HomePagesAllitem/AboutInstitute";
import AboutMadrasatu from "@/compounte/user/HomePagesAllitem/AboutMadrasatuNuurul";
import BinerSistion from "@/compounte/user/HomePagesAllitem/BinerSisTIon";
import ChooseMadrasatu from "@/compounte/user/HomePagesAllitem/ChooseourMadrasatu";
import ConnectMadrasatu from "@/compounte/user/HomePagesAllitem/ConnectMadrasatu";
import Convenience from "@/compounte/user/HomePagesAllitem/Convenience";
import LearningBenefits from "@/compounte/user/HomePagesAllitem/LearningBenefits";
import HeroCarouselWithCTA from "@/compounte/user/HomePagesAllitem/OurCourses";


import TriallClassJoin from "@/compounte/user/HomePagesAllitem/TriallClassJoin";

function HomeSistion() {
    return (<>
        <BinerSistion />
        < AboutInstitute />
        <TriallClassJoin />

        <HeroCarouselWithCTA />
        <Convenience />
        <WhyChooseUs />
        <LearningBenefits />
        <ChooseMadrasatu />
        <AboutMadrasatu />
        <ConnectMadrasatu />
    </>);
}

export default HomeSistion;