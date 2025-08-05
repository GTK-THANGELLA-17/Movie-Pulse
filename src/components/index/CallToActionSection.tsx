
import CTABackground from "./cta/CTABackground";
import CTAHeader from "./cta/CTAHeader";
import CTAContentCards from "./cta/CTAContentCards";
import CTAButtons from "./cta/CTAButtons";
import CTAFooter from "./cta/CTAFooter";

interface CallToActionSectionProps {
  navigateToVote: () => void;
  navigateToStats: () => void;
  navigateToIntro: () => void;
  buttonClickEffect: (e: any) => void;
}

const CallToActionSection = ({ navigateToVote, navigateToStats, navigateToIntro, buttonClickEffect }: CallToActionSectionProps) => {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <CTABackground />

      <div className="container mx-auto px-4 relative z-10">
        <CTAHeader />
        <CTAContentCards />
        <CTAButtons 
          navigateToVote={navigateToVote}
          navigateToStats={navigateToStats}
          navigateToIntro={navigateToIntro}
          buttonClickEffect={buttonClickEffect}
        />
        <CTAFooter />
      </div>
    </section>
  );
};

export default CallToActionSection;
