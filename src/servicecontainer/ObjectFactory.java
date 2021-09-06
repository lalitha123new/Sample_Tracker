
package servicecontainer;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the servicecontainer package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetPatDetailsByRegnoResponse_QNAME = new QName("http://ServiceContainer/", "getPatDetailsByRegnoResponse");
    private final static QName _GetReportDetailsBySampleNo_QNAME = new QName("http://ServiceContainer/", "getReportDetailsBySampleNo");
    private final static QName _GetReportDetailsBySampleNoResponse_QNAME = new QName("http://ServiceContainer/", "getReportDetailsBySampleNoResponse");
    private final static QName _GetUHIDDetailsOfSampleBySampleNo_QNAME = new QName("http://ServiceContainer/", "getUHIDDetailsOfSampleBySampleNo");
    private final static QName _GetUHIDDetailsOfSampleBySampleNoResponse_QNAME = new QName("http://ServiceContainer/", "getUHIDDetailsOfSampleBySampleNoResponse");
    private final static QName _GetPatDetailsByRegno_QNAME = new QName("http://ServiceContainer/", "getPatDetailsByRegno");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: servicecontainer
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetReportDetailsBySampleNo }
     * 
     */
    public GetReportDetailsBySampleNo createGetReportDetailsBySampleNo() {
        return new GetReportDetailsBySampleNo();
    }

    /**
     * Create an instance of {@link GetPatDetailsByRegnoResponse }
     * 
     */
    public GetPatDetailsByRegnoResponse createGetPatDetailsByRegnoResponse() {
        return new GetPatDetailsByRegnoResponse();
    }

    /**
     * Create an instance of {@link GetReportDetailsBySampleNoResponse }
     * 
     */
    public GetReportDetailsBySampleNoResponse createGetReportDetailsBySampleNoResponse() {
        return new GetReportDetailsBySampleNoResponse();
    }

    /**
     * Create an instance of {@link GetUHIDDetailsOfSampleBySampleNo }
     * 
     */
    public GetUHIDDetailsOfSampleBySampleNo createGetUHIDDetailsOfSampleBySampleNo() {
        return new GetUHIDDetailsOfSampleBySampleNo();
    }

    /**
     * Create an instance of {@link GetUHIDDetailsOfSampleBySampleNoResponse }
     * 
     */
    public GetUHIDDetailsOfSampleBySampleNoResponse createGetUHIDDetailsOfSampleBySampleNoResponse() {
        return new GetUHIDDetailsOfSampleBySampleNoResponse();
    }

    /**
     * Create an instance of {@link GetPatDetailsByRegno }
     * 
     */
    public GetPatDetailsByRegno createGetPatDetailsByRegno() {
        return new GetPatDetailsByRegno();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPatDetailsByRegnoResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ServiceContainer/", name = "getPatDetailsByRegnoResponse")
    public JAXBElement<GetPatDetailsByRegnoResponse> createGetPatDetailsByRegnoResponse(GetPatDetailsByRegnoResponse value) {
        return new JAXBElement<GetPatDetailsByRegnoResponse>(_GetPatDetailsByRegnoResponse_QNAME, GetPatDetailsByRegnoResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetReportDetailsBySampleNo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ServiceContainer/", name = "getReportDetailsBySampleNo")
    public JAXBElement<GetReportDetailsBySampleNo> createGetReportDetailsBySampleNo(GetReportDetailsBySampleNo value) {
        return new JAXBElement<GetReportDetailsBySampleNo>(_GetReportDetailsBySampleNo_QNAME, GetReportDetailsBySampleNo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetReportDetailsBySampleNoResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ServiceContainer/", name = "getReportDetailsBySampleNoResponse")
    public JAXBElement<GetReportDetailsBySampleNoResponse> createGetReportDetailsBySampleNoResponse(GetReportDetailsBySampleNoResponse value) {
        return new JAXBElement<GetReportDetailsBySampleNoResponse>(_GetReportDetailsBySampleNoResponse_QNAME, GetReportDetailsBySampleNoResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUHIDDetailsOfSampleBySampleNo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ServiceContainer/", name = "getUHIDDetailsOfSampleBySampleNo")
    public JAXBElement<GetUHIDDetailsOfSampleBySampleNo> createGetUHIDDetailsOfSampleBySampleNo(GetUHIDDetailsOfSampleBySampleNo value) {
        return new JAXBElement<GetUHIDDetailsOfSampleBySampleNo>(_GetUHIDDetailsOfSampleBySampleNo_QNAME, GetUHIDDetailsOfSampleBySampleNo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUHIDDetailsOfSampleBySampleNoResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ServiceContainer/", name = "getUHIDDetailsOfSampleBySampleNoResponse")
    public JAXBElement<GetUHIDDetailsOfSampleBySampleNoResponse> createGetUHIDDetailsOfSampleBySampleNoResponse(GetUHIDDetailsOfSampleBySampleNoResponse value) {
        return new JAXBElement<GetUHIDDetailsOfSampleBySampleNoResponse>(_GetUHIDDetailsOfSampleBySampleNoResponse_QNAME, GetUHIDDetailsOfSampleBySampleNoResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPatDetailsByRegno }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ServiceContainer/", name = "getPatDetailsByRegno")
    public JAXBElement<GetPatDetailsByRegno> createGetPatDetailsByRegno(GetPatDetailsByRegno value) {
        return new JAXBElement<GetPatDetailsByRegno>(_GetPatDetailsByRegno_QNAME, GetPatDetailsByRegno.class, null, value);
    }

}
