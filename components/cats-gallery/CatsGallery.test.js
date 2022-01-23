import {useWeb3React} from "@web3-react/core";
import CatsGallery from "./CatsGallery";
import {act, render, screen} from "@testing-library/react";
import {useContract} from "../../hooks/useContract";
import {mockedCat} from "../../util/test.utils";

jest.mock("@web3-react/core", () => ({
    ...(jest.requireActual("@web3-react/core")),
    useWeb3React: jest.fn(),
}))

jest.mock("../../hooks/useContract", () => ({
    ...(jest.requireActual("../../hooks/useContract")),
    useContract: jest.fn()
}))

describe('CatsGallery tests', () => {
    beforeEach(() => global.fetch = jest.fn())
    afterEach(() => delete global.fetch)

    it('should render the connect your wallet message if there is no wallet connected', () => {
        useWeb3React.mockReturnValue({
            active: false
        })
        render(<CatsGallery/>)

        expect(screen.getByText(/Please connect your wallet to see your cats 😺/)).toBeInTheDocument()
    })

    it('should render the error message in case of error', async () => {
        useWeb3React.mockReturnValue({
            active: true,
        })
        useContract.mockReturnValue({
            walletOfOwner: () => jest.mockReject()
        })
        render(<CatsGallery/>)

        expect(await screen.getByText(/An Error has occurred!/)).toBeInTheDocument()

    })

    it('should render the gallery correctly', async () => {
        jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve({
            ok: true,
            json: async () => ({...mockedCat})
        }));

        const idPromise = Promise.resolve([1])
        let resolvePromise
        useWeb3React.mockReturnValue({
            active: true,
        })
        useContract.mockReturnValue({
            walletOfOwner: () => idPromise,
            tokenURI: () => new Promise(resolve => {
                resolvePromise = resolve
            })
        })
        render(<CatsGallery/>)

        await act(() => idPromise)
        resolvePromise()

        expect(await screen.findByText(mockedCat.name)).toBeInTheDocument()
    })
})
