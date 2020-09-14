import SectionContainer, { SectionContainerProps } from "app/components/SectionContainer"

export type TitleSectionProps = SectionContainerProps

const TitleSectionContainer = (props: TitleSectionProps): JSX.Element => {
  return <SectionContainer {...props} bg="teal.50" py="48px" borderBottomWidth={1} />
}

export default TitleSectionContainer
