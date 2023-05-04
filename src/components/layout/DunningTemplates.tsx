



export default function DunningTemplates({ templateName, actionType, sender }: { templateName: string, actionType: string, sender: { [x: string]: any } }): JSX.Element {

    switch (templateName) {
        case "Early Reminder":
            if (actionType == "Email") {
                return (<p className="prose prose-md text-left font-gilroy-medium">

                    <span className="font-gilroy-bold">Early Reminder</span><br></br>
                    <span className="font-gilroy-bold">Subject</span>: Payment Reminder for Invoice <span className="font-gilroy-bold">[invoice number]</span><br></br>

                    Dear <span className="font-gilroy-bold">[receiver name]</span>,<br></br>

                    This email is on behalf of <span className="font-gilroy-bold">{sender?.name}</span>.<br></br>

                    Hope this email finds you well. This message is to remind you that the payment for the invoice number <span className="font-gilroy-bold">[invoice number]</span> for <span className="font-gilroy-bold">[invoice amount]</span> is due on <span className="font-gilroy-bold">[due date]</span>.<br></br>

                    Request you to ensure that the payment is processed by the due date. If you have any questions or concerns regarding the payment, please do not hesitate to contact  <span className="font-gilroy-bold">{sender?.poc}</span> at <span className="font-gilroy-bold">{sender?.poc_contact}</span>.<br></br>

                    We value your business and look forward to continued collaboration.<br></br>

                    Have a wonderful day!<br></br>

                    Best regards,<br></br>
                    <span className="font-gilroy-bold">{sender?.name}</span><br></br>
                </p>);
            } else {
                return (<p className="prose prose-md text-left font-gilroy-medium">
                    Hello <span className="font-gilroy-bold">[receiver name]</span>,<br></br>

                    We are sending this message on behalf of <span className="font-gilroy-bold">{sender?.name}</span>. Hope this message finds you well.<br></br>

                    This message is sent to kindly remind you about the payment for invoice #<span className="font-gilroy-bold">[invoice number]</span> that is due on <span className="font-gilroy-bold">[due date]</span>.<br></br>

                    The invoice amount is <span className="font-gilroy-bold">[invoice amount]</span>. Please contact <span className="font-gilroy-bold">{sender?.poc}</span> at <span className="font-gilroy-bold">{sender?.poc_contact}</span> if you have any questions or concerns regarding the payment.<br></br>

                    Best regards,<br></br>
                    <span className="font-gilroy-bold">{sender?.name}</span><br></br>
                </p>);
            }

        case "On Due Date":
            if (actionType == "Email") {
                return (
                    <p className="prose prose-md text-left font-gilroy-medium">
                        <span className="font-gilroy-bold">Due Date Reminder</span><br></br>

                        <span className="font-gilroy-bold">Subject:</span> Payment due for Invoice <span className="font-gilroy-bold">[invoice number]</span>

                        Dear <span className="font-gilroy-bold">[receiver name]</span>,

                        This is a message on behalf of <span className="font-gilroy-bold">{sender?.name}</span>.

                        This is a gentle reminder for the payment for invoice number <span className="font-gilroy-bold">[invoice number]</span> for <span className="font-gilroy-bold">[invoice amount]</span> is due today.

                        Request you to ensure that the payment is processed. If you have any questions or concerns regarding the payment, please do not hesitate to contact <span className="font-gilroy-bold">{sender?.poc}</span> at <span className="font-gilroy-bold">{sender?.poc_contact}</span>.

                        We value your business and look forward to continued collaboration.

                        Best regards,
                        <span className="font-gilroy-bold">{sender?.name}</span>

                    </p>)

            } else {
                return (<p className="prose prose-md text-left font-gilroy-medium">
                    Hello <span className="font-gilroy-bold">[receiver name]</span>,<br></br>

                    This message is on behalf of <span className="font-gilroy-bold">{sender?.name}</span> and is a gentle reminder that the payment for invoice #<span className="font-gilroy-bold">[invoice number]</span> for amount Rs. <span className="font-gilroy-bold">[invoice amount]</span> is due today.<br></br>

                    Request you to kindly process the payment. Kindly contact <span className="font-gilroy-bold">{sender?.poc}</span> at <span className="font-gilroy-bold">{sender?.poc_contact}</span> in case of any concerns regarding the payment. <br></br>

                    Thank you for your prompt attention to this matter.<br></br>

                    Best regards,<br></br>
                    <span className="font-gilroy-bold">{sender?.name}</span><br></br>
                </p>);
            }
        case "Overdue Reminder":
            if (actionType == "Email") {
                return (

                    <p className="prose prose-md text-left font-gilroy-medium">
                        <span className="font-gilroy-bold">Overdue Reminder</span><br></br>
                        <span className="font-gilroy-bold"> Subject:</span> Payment Overdue for Invoice <span className="font-gilroy-bold">[invoice number]</span><br></br>

                        Dear  <span className="font-gilroy-bold">[receiver name]</span>,<br></br>

                        This email is on behalf of <span className="font-gilroy-bold">{sender?.name}</span>.<br></br>

                        Hope this email finds you well.

                        This is to remind you that the payment for invoice number <span className="font-gilroy-bold">[invoice number]</span> for <span className="font-gilroy-bold">[invoice amount]</span> is overdue as of <span className="font-gilroy-bold">[due date]</span>. <br></br>

                        Request you to kindly process the payment as soon as possible. If you have any questions or concerns regarding the payment, please do not hesitate to contact <span className="font-gilroy-bold">{sender?.poc}</span> at <span className="font-gilroy-bold">{sender?.poc_contact}</span>.<br></br>

                        We value your business and look forward to continued collaboration.<br></br>

                        Have a wonderful day!<br></br>

                        Best regards,<br></br>
                        <span className="font-gilroy-bold">{sender?.name}</span><br></br>
                    </p>)

            } else {

                return (

                    <p className="prose prose-md text-left font-gilroy-medium">
                        Hello <span className="font-gilroy-bold">[receiver name]</span>,<br></br>

                        I hope this message finds you well. This message is on behalf of  <span className="font-gilroy-bold">{sender?.name}</span>,<br></br>

                        and is to bring to your attention that the payment for the invoice #<span className="font-gilroy-bold">[invoice number]</span> for the amount Rs.<span className="font-gilroy-bold">[invoice amount]</span> is overdue as of <span className="font-gilroy-bold">[due date]</span>.<br></br>

                        Request you to kindly process the payment as soon as possible. If you have already made the payment, please ignore this message.<br></br>

                        Kindly contact <span className="font-gilroy-bold">{sender?.poc}</span> at <span className="font-gilroy-bold">{sender?.poc_contact}</span> if you have any questions or concerns regarding the payment.<br></br>

                        Thank you for your prompt attention to this matter.<br></br>

                        Best regards,<br></br>
                        <span className="font-gilroy-bold">{sender?.name}</span><br></br>
                    </p>)
            }


    }

    return <></>
}
