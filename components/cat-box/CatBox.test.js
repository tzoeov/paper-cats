import {render, screen} from "@testing-library/react";

import CatBox from "./CatBox";
import {useContract} from "../../hooks/useContract";
import {mockedCat} from "../../util/test.utils";

jest.mock("../../hooks/useContract", () => ({
    ...(jest.requireActual("../../hooks/useContract")),
    useContract: jest.fn()
}))

describe('CatBox tests', () => {
    beforeEach(() => global.fetch = jest.fn())
    afterEach(() => delete global.fetch)

    it('should render the paper cat', async () => {
        let resolvePromise
        useContract.mockReturnValue({
            tokenURI: () => new Promise(resolve => {
                resolvePromise = resolve
            })
        })

        jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve({
            ok: true,
            json: async () => ({...mockedCat})
        }));

        render(<CatBox catId={1}/>)

        expect(await screen.getByText(/Loading/)).toBeInTheDocument()
        resolvePromise()

        expect(await screen.findByText(mockedCat.name)).toBeInTheDocument()
        expect(await screen.findByText(mockedCat.description)).toBeInTheDocument()
    })

    it('should render the error state', async () => {
        useContract.mockReturnValue({
            tokenURI: 'url'
        })
        jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve({
            ok: false,
        }));

        render(<CatBox catId={1}/>)

        expect(await screen.getByText(/Ups/)).toBeInTheDocument()
    })

})
