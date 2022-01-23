import {render, screen} from "@testing-library/react";

import Account from "./Account";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {testIds} from "../../util/constant";
import {beautifyAccount} from "../../util/utils";
import {injected} from "../wallet/connectors";
import userEvent from "@testing-library/user-event";

const accountNo = '0x2dB22f5983C42DAFa970461C809a2d853A44f5f3'

jest.mock("@web3-react/core", () => ({
    ...(jest.requireActual("@web3-react/core")),
    useWeb3React: jest.fn(),
}))

describe('Account tests', () => {
    it('should render the connect button correctly', () => {
        useWeb3React.mockReturnValue({
            account: null,
            error: null
        })
        render(<Account/>)

        expect(screen.getByTestId(testIds.connectBtn)).toBeInTheDocument()
        expect(screen.queryByTestId(testIds.logoutBtn)).not.toBeInTheDocument()
    })

    it(`should render 'Wrong Network' on wrong network selected`, () => {
        useWeb3React.mockReturnValue({
            error: new UnsupportedChainIdError(1)
        })
        render(<Account/>)

        expect(screen.getByText(/Wrong Network/)).toBeInTheDocument()
        expect(screen.queryByTestId(testIds.connectBtn)).not.toBeInTheDocument()
        expect(screen.queryByTestId(testIds.logoutBtn)).not.toBeInTheDocument()
    })

    it(`should render 'Error' on unhandled error error`, () => {
        useWeb3React.mockReturnValue({
            error: 'unhandled error'
        })
        render(<Account/>)

        expect(screen.getByText(/Error/)).toBeInTheDocument()
        expect(screen.queryByTestId(testIds.connectBtn)).not.toBeInTheDocument()
        expect(screen.queryByTestId(testIds.logoutBtn)).not.toBeInTheDocument()
    })

    it(`should render the account number and logout button if the wallet is connected`, () => {
        useWeb3React.mockReturnValue({
            account: accountNo,
            active: true
        })
        render(<Account/>)

        expect(screen.getByText(beautifyAccount(accountNo))).toBeInTheDocument()
        expect(screen.queryByTestId(testIds.logoutBtn)).toBeInTheDocument()
        expect(screen.queryByTestId(testIds.connectBtn)).not.toBeInTheDocument()
    })

    it(`should call the activate method on connect`, () => {
        const mockActivate = jest.fn()
        useWeb3React.mockReturnValue({
            account: null,
            error: null,
            activate: mockActivate
        })
        render(<Account/>)

        userEvent.click(screen.getByTestId(testIds.connectBtn))

        expect(mockActivate).toHaveBeenCalledWith(injected)
    })

    it(`should call the deactivate method on disconnect`, () => {
        const mockDeactivate = jest.fn()
        useWeb3React.mockReturnValue({
            account: accountNo,
            error: null,
            deactivate: mockDeactivate
        })
        render(<Account/>)

        userEvent.click(screen.getByTestId(testIds.logoutBtn))

        expect(mockDeactivate).toHaveBeenCalledTimes(1)
    })
})
