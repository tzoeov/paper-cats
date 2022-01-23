import {useWeb3React} from "@web3-react/core"
import {renderHook} from "@testing-library/react-hooks";
import {useContract} from "../useContract";

jest.mock("@web3-react/core", () => ({
    ...(jest.requireActual("@web3-react/core")),
    useWeb3React: jest.fn(),
}))

describe("Test the `useContract` hook", () => {
    const mockedLibrary = {
        getSigner: jest.fn()
    }

    it("should not create a contract instance if web3 is not active", () => {
        useWeb3React.mockReturnValue({
            active: false
        })
        const {result} = renderHook(() => useContract())

        expect(result.current).toBeNull()
    })

    it("should create contract instance if web3 is available", () => {
        useWeb3React.mockReturnValue({
            active: true,
            library: mockedLibrary,
        })
        const {result} = renderHook(() => useContract())

        expect(result.current).not.toBeNull()
    })
})
