const TestPage = () => {
    return (
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div
                    className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Авторизация
                    </h3>
                </div>

                <form action="#">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Логин</label>
                            <input type="text" name="login" id="login" value="..."
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Ex. Apple iMac 27&ldquo;"/>
                        </div>
                        <div>
                            <label htmlFor="price"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                            <input type="text" value="..." name="password" id="password"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="$299"/>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit"
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TestPage;