import {render, screen} from "@testing-library/react";

import Header from "./Header";
import {testIds} from "../../util/constant";

jest.mock("next/router", () => ({
    ...(jest.requireActual("next/router")),
    useRouter: () => ({
        asPath: jest.fn()
    })
}))

describe('Header test', () => {
    it('should not show the account on missing window.ethereum', () => {
        window.ethereum = null
        render(<Header/>)

        expect(screen.queryByTestId(testIds.accountContainer)).not.toBeInTheDocument()
    })

    it('should show the account when window.ethereum is defined', () => {
        window.ethereum = {}
        render(<Header/>)

        expect(screen.queryByTestId(testIds.accountContainer)).toBeInTheDocument()
    })
})
