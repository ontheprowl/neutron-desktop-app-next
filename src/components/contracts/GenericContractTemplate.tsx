import type { Contract } from "~/models/contracts";
import { extractDayMonthAndYear, formatDateToReadableString } from "~/utils/utils";
import { useFormContext } from "react-hook-form";
import { ClientInformationRedirect, PaymentAndMilestonesRedirect, ScopeOfWorkRedirect } from "./InputRedirects";
import { useLoaderData } from "@remix-run/react";
import NeutronSignComponent from "../signage/NeutronSignComponent";


export default function GenericContractTemplate({ viewMode }: { viewMode?: boolean }) {


    const data = useLoaderData();
    const contractData = data.contract;


    function generateMilestonesForContract() {
        let milestonesArray = []
        const milestonesContainer = contractData?.isPublished == "true" ? allContractFields?.milestones : allContractFields?.milestonesProcessed;
        if (milestonesContainer) {
            for (const [key, value] of Object.entries(milestonesContainer)) {
                if (key == "advance") {
                    milestonesArray.push(<li className=" list-inside pl-0 sm:pl-4 sm:list-outside">{value.name}<br></br>{value.description}<br></br>worth a sum of INR {value.value} /-</li>)
                } else {
                    for (const milestone of Object.values(value)) {
                        milestonesArray.push(<li className=" list-inside pl-0 sm:pl-4 sm:list-outside">{milestone.name}<br></br>{milestone.description}
                            <br></br>worth a sum of INR {milestone.value} /-</li>)
                    }
                }
            }

        }
        return milestonesArray

    }

    const methods = useFormContext();

    let allContractFields: Contract;
    if (methods) {
        allContractFields = methods.watch();
    } else {
        allContractFields = contractData;
    }







    const generateFormattedSignDate = () => {
        if (allContractFields?.startDate) {
            const { date, month, year } = extractDayMonthAndYear(allContractFields?.startDate);
            return `${date} day of ${month}, ${year} (the “Effective Date”)`;
        } else {
            return '[WILL BE FILLED IN DURING SIGNING]';

        }
    }


    return (<div id="contract-container" className={`sm:m-5 flex flex-row justify-center text-justify overflow-y-scroll h-auto ${viewMode ? 'max-h-[600px]' : 'max-h-[700px]'} scroll-smooth`}>
        <article className="prose prose-xl w-full flex flex-col p-3 scale-90 sm:scale-100 sm:p-0 sm:m-0  font-gilroy-regular" >
            <strong className="font-gilroy-bold text-center sm:text-left text-[25px] mb-5">SERVICE AGREEMENT</strong>


            <div className="break-normal whitespace-pre-wrap">This <span className="font-gilroy-bold">SERVICE AGREEMENT</span> (hereinafter, referred to as “the Agreement”) is entered into on this {generateFormattedSignDate()}

                <br></br>
                <div className="text-center mt-2">BY AND BETWEEN</div>
                <ClientInformationRedirect viewMode={viewMode}>{allContractFields.clientName}</ClientInformationRedirect>, (Name of Company/Agency/individual) a private limited/ limited company incorporated under the Companies Act, 2013/1956 having its registered office at <ClientInformationRedirect viewMode={viewMode}>{allContractFields.clientAddress}</ClientInformationRedirect>	(address of Registered office)/ a sole proprietorship/ an individual being an Indian citizen and not specifically registered as either of the above (hereinafter referred to as the “Employer”), bearing Permanent Account No. <ClientInformationRedirect viewMode={viewMode}>{allContractFields.clientPAN}</ClientInformationRedirect> of the FIRST PART;

                <br></br>
                <div className="text-center mt-2">AND</div>


                <ClientInformationRedirect viewMode={viewMode}>{allContractFields.providerName}</ClientInformationRedirect>, residing at <ClientInformationRedirect viewMode={viewMode}>{allContractFields.providerAddress}</ClientInformationRedirect> and bearing Permanent Account No. <ClientInformationRedirect viewMode={viewMode}>{allContractFields.providerPAN}</ClientInformationRedirect>/(hereinafter referred to as the “Service Provider”) of the SECOND PART;

                <br></br>
                <br></br>

                WHEREAS the Employer is undergoing the business of <ScopeOfWorkRedirect viewMode={viewMode}>{allContractFields.workType}</ScopeOfWorkRedirect>;

                <br></br>

                WHEREAS the Service Provider has expertise in the area of <ScopeOfWorkRedirect viewMode={viewMode}>{allContractFields.workType}</ScopeOfWorkRedirect>;
                <br></br>

                WHEREAS the Employer has now decided to hire the Service Provider through the Neutron platform (as defined hereunder) to render their services in certain areas of the business where they have established their expertise;
            </div>

            <div className="break-normal whitespace-pre-wrap mt-5 sm:mt-0">
                NOW, THEREFORE, the Parties hereby agree as follows:
                <br></br>

                <ol type="1" className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">DEFINITIONS:</span>
                        <br></br>
                        When used in this Agreement (as defined hereunder), the capitalized terms listed in this section shall have the meaning as provided below. Other capitalized terms used in this Agreement shall have the meaning respectively assigned to them elsewhere in this Agreement.
                        <ol type="a" >
                            <li><span className="font-gilroy-bold">“Agreement”</span> means this Service Agreement, its schedules, exhibits, emails, WhatsApp text messages, chats and messages exchanged over the Neutron platform, social networking communications, non-disclosure agreements together with all amendments as approved in writing by both the Parties from time to time;
                            </li>
                            <li>
                                <span className="font-gilroy-bold">“Service” and/or “Services”</span> is defined as any and all work to be performed by the Service Provider specified herein or in the Engagement, including without limitation all professional, management, labor, and general services, towards provision of a digital service as detailed in <b>‘Exhibit A’</b>;
                            </li>
                            <li>
                                <span className="font-gilroy-bold">“Neutron platform”</span> is defined as the platform for provision of digital services in exchange for money via contracts through which the Employer hires the Service Provider to avail their Services;

                            </li>
                            <li>
                                <span className="font-gilroy-bold">“Agency”</span> is defined to mean a registered business entity that arranges for the outsourcing of a Service Provider who is willing and able to provide services as per the Employer’s request, in exchange for a pre-determined commission from the compensation that the Service Provider is entitled to receive;

                            </li>
                            <li>
                                <span className="font-gilroy-bold">“Proof of Work”</span> is defined as any digital medium that can corroborate the completion of a digital service or digital product. This constitutes excerpts/extracts of the final asset, live presentations of completed work over video call, or any other method of verification of work that the Neutron platform allows.

                            </li>
                            <li>
                                <span className="font-gilroy-bold">Written” or “In Writing” </span> means any communication in a written form, which shall include, without limitation, any communication by telex, facsimile, via the Neutron platform, and electronic e-mail transmission.

                            </li>
                        </ol>

                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">ENGAGEMENT AND SERVICES:</span>
                        <br></br>

                        <ol type="a">
                            <li>
                                The Employer hereby agrees that the Service Provider provides the Services as set forth in <b>‘Exhibit A’</b> attached hereto.
                            </li>
                            <li>
                                All the Services to be provided by the Service Provider shall be performed with promptness and diligence in a manner as so specified by the Employer and as agreed upon by the Parties under Exhibit B (as defined hereunder).
                            </li>
                            <li>
                                If Proof of Work is not communicated via the Neutron platform, the Neutron platform shall be obligated to furnish documentary evidence of the service agreement and its particulars as detailed in Clause 26 C, to the best of its abilities.
                            </li>
                            <li>
                                The completeness of the Services and work product shall be determined by the Employer in its sole discretion, and the Service Provider agrees to make a maximum of <ScopeOfWorkRedirect viewMode={viewMode}>{allContractFields.revisions}</ScopeOfWorkRedirect> revisions, additions, deletions, or alterations as requested by the Employer.
                            </li>
                        </ol>


                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">TOOLS, INSTRUMENTS AND EQUIPMENT:</span>
                        <br></br>

                        The Service Provider undertakes and agrees to provide the Service Provider’s own tools, instruments, equipment and property in furtherance of the provision and performance of the Services.

                        If the Service Provider so requires, the Employer shall provide such access to its information, personnel, property, tools, instruments and equipment as may be reasonable, in order to permit the Service Provider to perform and complete their Services.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">REPRESENTATION AND WARRANTY:</span>
                        <br></br>


                        The Service Provider hereby represents and warrants to the Employer that they are under no contractual duties, obligations, restrictions, or covenants which are inconsistent with the execution of their duties and obligations under this Agreement or which will interfere with the performance of the Services.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">COMPENSATION:</span>
                        <br></br>

                        The Service Provider shall be entitled to a total compensation amount of INR <PaymentAndMilestonesRedirect viewMode={viewMode}>{allContractFields.contractValue}</PaymentAndMilestonesRedirect>/- (Rupees) for the Services so rendered.
                        <br></br>
                        This total compensation shall either be disbursed in lump sum or in parts upon the successful completion of specific milestones of the Services in the manner as set forth specifically in the Payment and Progress Schedule annexed as ‘Exhibit B’ hereunder. No other fee or expenses shall be paid to the Service Provider unless the Employer has approved such fee or expenses in writing.
                        Time is of the essence with respect to payment for the Services and it is an essential condition to this Agreement. The Service Provider shall be entitled to terminate the Agreement upon non-payment for the said Services or for specific milestones, as under Exhibit B, by the Employer.

                        If the Employer disputes any compensation for the Services, the Employer shall notify the Service Provider in writing/email communication/ via the Neutron platform and will submit such dispute to the Service Provider as soon as it is aware of the dispute, but in no event later than fourteen (14) days from when the said compensation for the Services is payable. The Employer agrees to pay the full compensation as under Exhibit B, except for pending the resolution of such dispute. The Service Provider will respond to The Employer’s written dispute within fourteen (14) days of receipt of such dispute and initiate actions as laid down in Clause 26 herein.

                        The Service Provider acknowledges and agrees that if they fail to adequately complete the work as under Exhibit B and if they fail to address disputes (if any) raised by the Employer, the Employer has the sole right to cancel this Agreement. The Employer must pay Service Provider  [minimum base pay] as specified under Exhibit B, regardless of the proportion of the Services completed till date.

                        If the Service Provider fails to meet the work deadline, they must contact the Employer to request a deadline extension at least 24 hours prior to the due date and the extensions may be granted as under Clause 2(B) of the Agreement.

                        The Service Provider shall be solely responsible for any and all taxes, social security contributions or payments, disability insurance, unemployment taxes, and other payroll type taxes or other legal requirements applicable to such compensation or to the Service Provider.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">RELATIONSHIP BETWEEN THE EMPLOYER AND THE SERVICE PROVIDER:</span>
                        <br></br>

                        The Service Provider is an independent contractor as defined above.
                        The Service Provider is not authorized to act on behalf of the Employer. <br></br> While the Employer is entitled to provide the Service Provider with general guidance to assist the Service Provider in completing the Services to the Employer’s satisfaction, nevertheless the Service Provider is ultimately responsible for directing and controlling the performance of the task comprising the scope of Services, in accordance with the terms and conditions of this Agreement.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">OBLIGATIONS AND WARRANTIES OF SERVICE PROVIDER:</span>
                        <br></br>

                        Upon submitting the Services to the Employer, Service Provider represents and warrants that the Services (or any part of it):
                        <ol type="a">
                            <li>
                                is plagiarism-free and original (is not owned by any third party fully or partially);
                            </li>
                            <li>
                                complies with all requirements provided by the Employer and as specified in Exhibit A;
                            </li>
                            <li>
                                has not been obtained by unlawful means;
                            </li>
                        </ol>
                        The Service Provider acknowledges and agrees that the Services must conform to general standards as determined by the Employer.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">OBLIGATIONS AND WARRANTIES OF THE EMPLOYER:</span>
                        <br></br>

                        The Employer warrants and undertakes to the Service Provider –
                        <ol type="a">
                            <li>
                                to provide all such reasonable information required for the provision of Services;
                            </li>
                            <li>
                                to comply with the referred and undisputed terms of compensation as under Clause 2 of this Agreement;
                            </li>
                            <li>
                                to duly inform the Service Provider in advance of revisions (if any) to be made in the scope of Services;
                            </li>
                            <li>
                                destroy all confidential information in relation to the Service Provider, post the termination of this agreement, whatever the reason may be for such termination.
                            </li>
                        </ol>
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">TERM:</span>
                        <br></br>

                        The Services to be provided under this Agreement shall be for the period commencing with effect from <ClientInformationRedirect viewMode={viewMode}>{allContractFields.startDate}</ClientInformationRedirect> to <ClientInformationRedirect viewMode={viewMode}>{allContractFields.endDate}</ClientInformationRedirect>, and shall continue in force upto the completion of provision of the Services unless a notice of termination is given by either party as per Clause 10 hereunder.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                            <span className="font-gilroy-bold">TERMINATION:</span>
                            <br></br>

                            Either party may apply to the Neutron platform for termination of this Agreement by providing the other party adequate notice communicated via the Neutron platform if the other Party:
                            <ol type="a">
                                <li>is in material breach of this Agreement and has failed to acknowledge such breach within fourteen (14) days after its receipt of written notice of such breach provided by the non-breaching Party;</li>
                                <li>engages in any unlawful business practice related to that Party's performance under the Agreement; or</li>
                                <li>files a petition for bankruptcy, becomes insolvent, acknowledges its insolvency in any manner, makes an assignment for the benefit of its creditors, or has a receiver, trustee or similar party appointed for its property. In such case, the Parties shall give a notice of 1 (one) month prior to termination.</li>
                            </ol>
                            <b>Upon proper verification of the application and cause for termination from both parties, the termination request will be processed by the Neutron platform.</b>

                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">CONSEQUENCES OF TERMINATION:</span>
                        <br></br>

                        In the event the Employer terminates this Agreement prior to the completion of Services and subsequent to the provision of notice as communicated via the Neutron platform, the Neutron platform will release any unprocessed funds back to the Employer. However, the Freelancer will be entitled to receive a minimum amount of compensation as agreed upon by both Parties and as stipulated in Exhibit B.

                        In the event the Freelancer terminates this Agreement prior to the completion of Services and subsequent to provision of notice communicated via the Neutron platform, the Freelancer will be entitled to receive compensation for the Services rendered till such date of termination (if any) as agreed upon by both Parties and as stipulated in Exhibit B.

                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">CONFIDENTIAL INFORMATION:</span>
                        <br></br>

                        The Employer owns and may develop, compile and own certain proprietary techniques, trade secrets, and confidential information, which are very valuable to the Employer (collectively, “Confidential Information”). Confidential Information includes, but is not limited to, details of customers and business contacts, developments, designs, inventions, software, techniques, know-how, data, marketing, sales or other business information, scripts, costs and resources, tools used; and all derivatives or improvements to any of the above.

                        For the purpose of this section, Confidential Information is any information relating to the Employer that is not accessible by the general public and includes not only information disclosed by the Employer, but also information developed or learned by the Service Provider during the Service Provider's performance of the Services. Employer Information is to be broadly defined and includes all information, which has or could have commercial value or other utility in the business that the Employer is or may be engaged in and the unauthorized disclosure of which could be detrimental to the interests of the Employer, whether or not such information is identified by the Employer. The Employer may also disclose this Confidential Information to the Service Provider during the Service Provider's performance of the Services.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">NON-DISCLOSURE AND PROTECTION:</span>
                        <br></br>

                        The Service Provider agrees that at all times during or subsequent to the performance of the Services, the Service Provider will keep confidential and not disclose or cause to be disclosed, publish, disseminate or otherwise make available or use Confidential Information, except for the Service Provider's own use during the Term of this Agreement and only to the extent necessary to perform the Services. The Service Provider shall not remove or cause to be removed tangible embodiments of, or electronic files containing, Confidential Information from the Employer, without express prior written approval of the Employer.


                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">DISCLAIMER:</span>
                        <br></br>

                        Except as expressly set forth herein, both Parties hereby disclaim all warranties to each other and all third parties with respect to express, implied, statutory warranties including, without limitation, with respect to the services or deliverables (and all portion or components thereof), implied warranties of merchantability, quality, non-infringement, and fitness for a purpose.
                        This Agreement constitutes a legal, valid, and binding obligation, enforceable against the Parties in accordance with its terms. Save for the representations and warranties set forth in this Agreement, there are no other representations express or implied, and specifically there are no implied representations or warranties of merchantability or fitness for a particular purpose.

                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">REMEDIES:</span>
                        <br></br>

                        Notwithstanding anything contained herein, the Service Provider acknowledges that a breach of any of the covenants contained in this Agreement could result in injury to the Employer and that, in the event of such a breach or threat thereof, the Employer shall be entitled to obtain remedies available under Applicable Law including but not limited to injunctive relief through any court of competent jurisdiction. The injunctive remedies are cumulative and are in addition to any other rights and remedies that the Employer may have at law or in equity.

                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">SERVICE PROVIDER’S LIMITATION OF LIABILITY:</span>
                        <br></br>

                        Except for Service Provider’s confidentiality and indemnity obligations, respectively, and except for actions or claims arising from gross negligence or intentional or willful misconduct, the Service Provider’s total liability to Employer shall not exceed the greater of –

                        <ol type="a">
                            <li>the total compensation value for the Services as agreed upon under Clause 5 of this Agreement; or
                            </li>
                            <li>
                                the amount of recoverable insurance, regardless of whether any action or claim is based upon contract, warranty, tort (including negligence) or strict liability.
                            </li>
                        </ol>
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">FORCE MAJEURE:</span>
                        <br></br>

                        No Party shall be liable or responsible to the other Party, nor be deemed to have defaulted under or breached this Agreement, for any failure or delay in fulfilling or performing any term of this Agreement (except for any obligations to make previously owed payments to the other party hereunder) when and to the extent such failure or delay is caused by or results from acts beyond the impacted Party’s (“Impacted Party”) reasonable control, including, without limitation, the following force majeure events (“Force Majeure Event(s)”) that frustrates the purpose of this Agreement: (a) acts of God; (b) flood, fire, earthquake or explosion; (c) war, invasion, hostilities (whether war is declared or not), terrorist threats or acts, riot or other civil unrest; (d) government order or law; (e) actions, embargoes or blockades in effect on or after the date of this Agreement; (f) action by any governmental authority; (g) national or regional emergency; (h) strikes, labor stoppages or slowdowns or other industrial disturbances; (i) epidemic, pandemic or similar influenza or bacterial infection (like COVID or infection that may cause global outbreak, or pandemic, or serious illness); (j) emergency state; (k) shortage of adequate medical supplies and equipment; (l) shortage of power or transportation facilities; and (m) other similar events beyond the reasonable control of the Impacted Party.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">NON-ASSIGNMENT</span>
                        <br></br>

                        The interests of the Service Provider under this Agreement are not subject to the claims of his creditors and may not be voluntarily or involuntarily assigned, alienated or encumbered.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">INDEMNIFICATION:</span>
                        <br></br>
                        <ol type="a">
                            <li>
                                The Service Provider shall indemnify the Employer against any and all expenses, including amounts paid upon judgments, counsel fees, environmental penalties and fines, and amounts paid in settlement (before or after suit is commenced), incurred by the employer in connection with his/her defense or settlement of any claim, action, suit or proceeding in which he/she is made a party or which may be asserted against his/her by reason of his/her employment or the performance of duties in this Agreement. Such indemnification shall be in addition to any other rights to which those indemnified may be entitled under any law, by-law, agreement, or otherwise.

                            </li>
                            <li>
                                The Employer shall indemnify the Service Provider against any and all expenses, including amounts paid upon judgments, counsel fees, environmental penalties and fines, and amounts paid in settlement (before or after suit is commenced), incurred by the Service Provider in connection with his/her defense or settlement of any claim, action, suit or proceeding in which he/she is made a party or which may be asserted against his/her by reason of his/her employment or the performance of duties in this Agreement. Such indemnification shall be in addition to any other rights to which those indemnified may be entitled under any law, by-law, agreement, or otherwise
                            </li>
                        </ol>
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">MODIFICATION:</span>
                        <br></br>

                        Any modification of this Agreement or additional obligation assumed by either party in connection with this Agreement shall be binding only if evidenced in writing signed by each party or an authorized representative of each party.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">ENTIRE AGREEMENT:</span>
                        <br></br>

                        This Agreement constitutes the sole and entire agreement between the parties with respect to the Confidential Information and all restrictions thereon; it supersedes all prior or contemporaneous oral or written agreements except any NDA executed before this agreement, negotiations, communications, understandings and terms, whether express or implied regarding the Confidential Information, and may not be amended except in a writing signed by a duly authorized representative of the respective parties. Any other agreements between the parties, including non-disclosure agreements, will not be affected by this Agreement.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">ELECTRONIC SIGNATURES:</span>
                        <br></br>

                        The words “execution,” “execute,” “signed,” “signature,” and words of like import in or related to this Agreement or any other document to be signed in connection with this Agreement and the transactions contemplated hereby shall be deemed to include electronic signatures, the electronic matching of assignment terms and contract formations on electronic platforms or the keeping of records in electronic form. Any signature (including any electronic symbol or process attached to, or associated with, a contract or other record and adopted by a person with the intent to sign, authenticate or accept such contract or record) hereto or to any other certificate, agreement or document related to this transaction, and any contract formation each of which shall be of the same legal effect, validity or enforceability as a manually executed signature or the use of a paper-based recordkeeping system, as the case may be, to the extent and as provided for in any applicable law, including the Information Technology Act, 2000.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">SEVERABILITY:</span>
                        <br></br>

                        Each paragraph of this agreement shall be and remain separate from and independent of and severable from all and any other paragraphs herein except where otherwise indicated by the context of the agreement. The decision or declaration that one or more of the paragraphs are null and void shall have no effect on the remaining paragraphs of this agreement.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">NO WAIVER:</span>
                        <br></br>

                        The failure of either Party to enforce any right resulting from breach of any provision of this Agreement by the other party will not be deemed a waiver of any right relating to a subsequent breach of such provision or of any other right hereunder.
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">SURVIVAL:</span>
                        <br></br>

                        Any terms and conditions that by their nature or otherwise reasonably should survive cancellation or termination of this Agreement shall be deemed to survive the cancellation or termination of this Agreement. Such terms and conditions include, but are not limited to, Term and Termination (Clause 9 and Clause 10), Confidentiality Obligations (Clause 12), Limitation of Liability (Clause 16), Governing Law and Jurisdiction (Clause 26), Indemnity (Clause 19 ) and Severability (Clause 23).
                    </li>
                    <li id="dispute-resolution" className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">GOVERNING LAW AND DISPUTE RESOLUTION:</span>
                        <br></br>

                        <ol>
                            <li>
                                This Agreement shall be governed by and construed in accordance with the laws of India. Each party hereby irrevocably submits that this Agreement will be governed by the laws of India without reference to conflict of law principles if any. Any disputes arising from this Agreement shall be subject to the jurisdiction of the courts in Bengaluru, Karnataka.
                            </li>
                            <li>
                                If any dispute arises in connection with this Agreement including its validity, interpretation, execution, or alleged breach of any provision of this Agreement (“Dispute”), the disputing parties hereto shall endeavor to settle such Dispute amicably through the Neutron platform. The attempt to bring about an amicable settlement shall be considered to have failed if not resolved within 14 calendar days from the date of the Dispute.
                            </li>
                            <li>
                                In relation to a Dispute that may arise as aforementioned, the Neutron platform shall assist the Parties towards an amicable settlement and shall further provide all such necessary documentary/digital evidence or proofs as requested by the Parties, in furtherance of amicably settling such Dispute between the Parties.
                            </li>
                            <li>
                                In the event such Dispute is not resolved within a period of six (6) months from the day on which the Dispute arose, this Agreement will be rendered null and void by the Neutron Platform and any and all funds held by the Neutron platform will be returned to the Employer.
                            </li>
                            <li>
                                The Parties shall be entitled to refer any Dispute to arbitration upon the application of any Party, and finally settle such Dispute by a sole arbitrator to be mutually appointed by both Parties. The seat of the arbitration shall be Bengaluru, Republic of India.
                            </li>
                            <li>
                                In case the Parties are unable to agree on a sole arbitrator, each of the Parties shall appoint 1 arbitrator each and the 2 arbitrators so appointed shall appoint a 3rd presiding arbitrator. The arbitration proceedings shall be conducted in English in accordance with the terms of the Arbitration and Conciliation Act, 1996.
                            </li>
                        </ol>
                    </li>
                    <li className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                        <span className="font-gilroy-bold">COUNTERPARTS:</span>
                        <br></br>

                        The Agreement may be executed in two or more counterparts, any one of which shall be deemed the original without reference to the others.
                    </li>

                </ol>
            </div>



            <div className="font-gilroy-bold">IN WITNESS WHEREOF THE PARTIES HAVE HEREUNTO SET THEIR HANDS AND SEALS THE DAY AND YEAR FIRST ABOVE WRITTEN</div>



            <div className="flex flex-row w-full justify-between p-8 my-5 space-x-8">
                <div className="font-gilroy-bold basis-1/2 scale-75 sm:scale-90 ">
                    {allContractFields.signedByProvider && allContractFields.providerEmail && allContractFields.providerID && allContractFields.signedByProviderDate ? <NeutronSignComponent signerEmail={allContractFields.providerEmail} signerAadhaar={allContractFields.providerAadhaar} signerID={allContractFields.providerID} signDate={formatDateToReadableString(allContractFields.signedByProviderDate, false, true)}></NeutronSignComponent> :
                        <div>
                            Signed, Sealed and Delivered by:
                            <br>
                            </br>
                            (Service Provider)
                            <br>
                            </br>
                            Name: <span className="font-gilroy-bold text-purple-600"> Service Provider's signature goes here</span>
                            <br>
                            </br>
                            Date:
                        </div>}

                </div>
                <div className="font-gilroy-bold basis-1/2 scale-75 sm:scale-90">
                    {allContractFields.signedByClient && allContractFields.clientEmail && allContractFields.clientID && allContractFields.signedByClientDate ? <NeutronSignComponent signerEmail={allContractFields.clientEmail} signerAadhaar={allContractFields.clientAadhaar} signerID={allContractFields.clientID} signDate={formatDateToReadableString(allContractFields.signedByClientDate, false, true)}></NeutronSignComponent> :
                        <div>
                            Signed, Sealed and Delivered by:
                            <br>
                            </br>

                            (The Employer)
                            <br>
                            </br>
                            Name: <span className="font-gilroy-bold text-purple-600 "> Employer's signature goes here</span>
                            <br>
                            </br>
                            Date:
                        </div>}

                </div>

            </div>


            <p id="scope-of-work">
                <b>‘EXHIBIT A’</b>
                <br></br>
                <span className="font-gilroy-bold">DESCRIPTION OF SERVICES</span>
                <br>
                </br>
                The Service Provider hereby agrees to provide the following services in accordance with the terms defined in this document, pursuant to all aforementioned clauses and any explicitly enforceable claims.
                <ol className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                    <ScopeOfWorkRedirect viewMode={viewMode}>{allContractFields.description}</ScopeOfWorkRedirect>

                </ol>

                <b>The Service Provider resolves to provide Proof of Work towards the completion of the aforementioned services, within the agreement end date mentioned in Clause 9 OR within the specific milestone end dates as outlined in Exhibit B.</b>
            </p>

            <p id="exhibit-b">
                <b>‘EXHIBIT B’</b>
                <br>
                </br>
                <span className="font-gilroy-bold">SCHEDULE FOR COMPENSATION AND PROOF OF WORK</span>
                <br></br>
                Compensation for the Services shall be disbursed to the Service Provider by the Employer, in accordance with the terms specified in Clause 3 and will be paid out according in the following manner:

                <ol className=" list-inside pl-0 sm:pl-4 sm:list-outside">
                    <PaymentAndMilestonesRedirect viewMode={viewMode}>{
                        generateMilestonesForContract()
                    }</PaymentAndMilestonesRedirect>

                </ol>
            </p>





















        </article >

    </div >);
}