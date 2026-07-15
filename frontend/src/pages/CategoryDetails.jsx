import { useParams } from "react-router-dom";

import PageBanner from "../components/common/PageBanner";
import Section from "../components/layout/Section";
import Container from "../components/layout/Container";
import SectionHeading from "../components/common/SectionHeading";

import RecipientGrid from "../components/recipients/RecipientGrid";

export default function CategoryDetails() {
  const { slug } = useParams();

  // Convert "arts-and-culture" → "Arts And Culture"
  const categoryName = slug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <PageBanner
        title={categoryName}
        subtitle={`Meet the distinguished recipients recognized under the ${categoryName} category.`}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Categories", path: "/categories" },
          { label: categoryName },
        ]}
      />

      <Section background="white">
        <Container>
          <SectionHeading
            eyebrow="Award Recipients"
            title={`${categoryName} Recipients`}
            description={`Explore the remarkable individuals who have been honored for their outstanding contributions in the ${categoryName} category.`}
            align="center"
          />

          <RecipientGrid categorySlug={slug} />
        </Container>
      </Section>
    </>
  );
}