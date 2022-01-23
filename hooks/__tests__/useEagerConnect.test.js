import {renderHook} from "@testing-library/react-hooks";
import useEagerConnect from "../useEagerConnect";
import {injected} from "../../components/wallet/connectors";
import {connectorLocalStorageKey} from "../../util/constant";

const mockActivate = jest.fn()

jest.mock("@web3-react/core", () => ({
    ...(jest.requireActual("@web3-react/core")),
    useWeb3React: () => ({
        activate: mockActivate
    })
}))

describe("Test the `useEagerConnect` hook", () => {
    afterEach(() => {
        window.localStorage.clear();
    });

    it('should not call `activate` in case local storage is empty', () => {
        renderHook(() => useEagerConnect())

        expect(mockActivate).not.toHaveBeenCalled()
    })

    it('should  call `activate` in case local storage has connectorId', () => {
        window.localStorage.setItem(connectorLocalStorageKey, 'injected')
        renderHook(() => useEagerConnect())

        expect(mockActivate).toHaveBeenCalledWith(injected)
    })
})
