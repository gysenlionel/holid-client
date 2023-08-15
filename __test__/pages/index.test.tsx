import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// import mockRouter from "next-router-mock";
import Index, { IIndexProps, getServerSideProps } from "../../pages/index";
import { IUser } from "../../types/user";
import { Hotel, PropertyTypes } from "../../types";

describe("Home page", () => {
  it("renders with mock data from getServerSideProps", async () => {
    const propertyTypes = [
      {
        count: 7,
        type: "hotels",
      },
    ];
    const caribbeanHotels = [
      {
        address: "carretera la aguada Samana Malecon Samana, 32000",
        cheapestPrice: 171,
        city: "santa bárbara de samaná",
        country: "dominican republic",
        createdAt: "2023-03-05T20:38:49.920Z",
        desc: "Located in Santa Bárbara de Samaná, 2 km from Cayacoa Beach, Hacienda Samana Bay Hotel provides accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden. With a terrace, the property also features a restaurant, as well as a bar. The accommodation offers a 24-hour front desk, airport transfers, room service and free WiFi throughout the property.",
        distance: "2000",
        featured: false,
        name: "Hacienda Samana Bay Hotel",
        photos: [
          {
            createdAt: "2023-03-05T20:38:49.894Z",
            public_id: "photos-hotel/omencjahldmdbffzoeom",
            updatedAt: "2023-03-05T20:38:49.894Z",
            url: "https://res.cloudinary.com/dphjfzo3n/image/upload/v1678048729/photos-hotel/omencjahldmdbffzoeom.webp",
            _id: "6404fdd9e29061d5e30c96f0",
          },
        ],
        rating: 5,
        region: "caribbean",
        rooms: ["64c9388c487e7e80ca745522", "64c93b9e487e7e80ca74559c"],
        slug: "hacienda-samana-bay-hotel",
        title: "beautiful hotel near cayacoa beach",
        type: "hotel",
        updatedAt: "2023-08-01T17:06:38.969Z",
        _id: "6404fdd9e29061d5e30c96f2",
      },
    ];

    // Render the component
    const getByText = render(
      <Index caribbeanHotels={caribbeanHotels} propertyTypes={propertyTypes} />
    );
    // expect(screen.getByText("carretera")).toBeInTheDocument;
    // expect(getByText).toMatchSnapshot();
    // Assert the expected behavior
    // expect(
    //   await screen.findByText("carretera", {}, { timeout: 3000 })
    // ).toBeInTheDocument();
    // expect(getByText(data)).toBeInTheDocument();
    // await waitFor(() => {
    //   expect(screen.getByText("santa")).toBeInTheDocument();
    // });
  });
});
// interface IProps {
//   caribbeanHotels: Hotel[];
//   propertyTypes: PropertyTypes[];
//   user: null | IUser;
//   initialState: { travel: [Object]; _persist: [Object] };
// }
// describe("MyComponent", () => {
//   it("should render with data from getServerSideProps", async () => {
//     const parameter = "example-parameter";

//     // Mock getServerSideProps data
//     const serverSideProps = (await getServerSideProps({
//       params: { parameter },
//       req: undefined,
//       res: undefined,
//       query: undefined,
//       resolvedUrl: "",
//     })) as { props: IProps };
//     console.log(serverSideProps.props.caribbeanHotels);
//     mockRouter.push("/stays");
//     // Render the component with mocked props. Just return propertiesTypes and caribbeanHotels
//     const { getByText } = render(
//       <Index
//         caribbeanHotels={serverSideProps.props.caribbeanHotels}
//         propertyTypes={serverSideProps.props.propertyTypes}
//       />
//     );

//     // Ensure that the component renders with the expected data
//     // const expectedData = `santa`;
//     // expect(getByText(expectedData)).toBeInTheDocument();
//   });
// });
