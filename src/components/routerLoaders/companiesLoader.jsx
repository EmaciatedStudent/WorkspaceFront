import useCompanyService from "../../services/companyService";

export async function CompaniesLoader() {
    const {getCompanies} = useCompanyService();

    let companiesData = await getCompanies().then(res => res.companies_info)
        .catch(res => console.log(res));

    return {companiesData};
}