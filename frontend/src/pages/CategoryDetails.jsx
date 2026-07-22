import { useParams } from "react-router-dom";

import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";

import RecipientGrid from "../components/recipients/RecipientGrid";

export default function CategoryDetails() {
  const { slug } = useParams();

  // Convert "arts-and-culture" -> "Arts And Culture"
  const categoryName = slug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <PageBanner
        title={categoryName}
        subtitle={`Meet the distinguished recipients recognized under the ${categoryName} category, across every edition of the Koshi Excellence Award.`}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Categories", path: "/categories" },
          { label: categoryName },
        ]}
      />

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Award Recipients"
          title={`${categoryName} Recipients`}
          subtitle={`Explore the remarkable individuals who have been honored for their outstanding contributions in the ${categoryName} category, from every year of the awards.`}
          center
        />

        <RecipientGrid categorySlug={slug} />
      </Section>
    </>
  );
}
