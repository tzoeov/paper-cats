import {render, screen, waitFor} from "@testing-library/react";
import {useWeb3React} from "@web3-react/core";

import AdoptCats from "./AdoptCats";
import {basePrice, testIds} from "../../util/constant";
import {useContract} from "../../hooks/useContract";
import {ethers} from "ethers";
import userEvent from "@testing-library/user-event";

jest.mock("@web3-react/core", () => ({
    ...(jest.requireActual("@web3-react/core")),
    useWeb3React: jest.fn(),
}))

jest.mock("../../hooks/useContract", () => ({
    ...(jest.requireActual("../../hooks/useContract")),
    useContract: jest.fn()
}))

const decrementBtn = () => screen.getByTestId(testIds.decrementBtn)
const incrementBtn = () => screen.getByTestId(testIds.incrementBtn)
const adoptBtn = () => screen.getByTestId(testIds.adoptBtn)
const amount = () => screen.getByTestId(testIds.amount)

describe("AdoptCats tests", () => {
    it('should render the connect wallet info text when the wallet is not connected', () => {
        useWeb3React.mockReturnValue({
            active: false
        })
        render(<AdoptCats/>)

        expect(screen.getByText(/Please connect your wallet/)).toBeInTheDocument()
    })

    it('should disable the buttons in case of incorrect values', () => {
        useWeb3React.mockReturnValue({
            active: true
        })
        render(<AdoptCats/>)

        //initial amount value
        expect(amount()).toHaveTextContent(1)

        // disable decrement & adopt on 0
        userEvent.click(decrementBtn())
        expect(decrementBtn()).toBeDisabled()
        expect(adoptBtn()).toBeDisabled()

        // disable increment on 3
        userEvent.click(incrementBtn())
        userEvent.click(incrementBtn())
        userEvent.click(incrementBtn())
        expect(incrementBtn()).toBeDisabled()
        expect(adoptBtn()).toBeEnabled()
    })

    it('should call the contract with the selected amount', async () => {
        const mockAdopt = jest.fn()
        useWeb3React.mockReturnValue({
            active: true
        })
        useContract.mockReturnValue({
            adopt: mockAdopt
        })
        render(<AdoptCats/>)

        userEvent.click(adoptBtn())

        await waitFor(() => {
            expect(mockAdopt).toHaveBeenCalledWith(1, {value: ethers.utils.parseUnits((basePrice).toString())})
        })
    })
})
