import {Pagination, PaginationContent, PaginationItem,} from "@/components/ui/pagination";
import {PaginationType} from "@/app/type/PaginationType";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

type Props = {
    meta: PaginationType;
    onPageChange: (page: number) => void;
};

export function PaginationData({meta, onPageChange}: Props) {

    const handlePageClick = (newPage: number) => {
        onPageChange(newPage);
    };

    return (
        <Pagination className="mt-10">
            <PaginationContent>
                {meta.links.map((link, index) => {
                    if (index === 0) {
                        const getPrevPage: any = getPage(link.url)
                        return (
                            <PaginationItem key={index}>
                                <Button onClick={() => handlePageClick(parseInt(getPrevPage))}
                                        className="bg-gray-100 text-gray-900 hover:text-white"
                                        disabled={meta.current_page === 1}
                                >
                                    <span><ChevronLeft/></span>
                                    <span>Previous</span>
                                </Button>
                            </PaginationItem>
                        );
                    } else if (index === meta.links.length - 1) {
                        const getNextPage: any = getPage(link.url)
                        return (
                            <PaginationItem key={index}>
                                <Button onClick={() => handlePageClick(parseInt(getNextPage))}
                                        className="bg-gray-100 text-gray-900 hover:text-white"
                                        disabled={meta.current_page === meta.last_page}
                                >
                                    <span>Next</span>
                                    <span><ChevronRight/></span>
                                </Button>
                            </PaginationItem>
                        );
                    }
                    const activeClass: string = link.active ? "bg-black text-white" : "bg-gray-100 text-gray-900 hover:text-white border";
                    return (
                        <PaginationItem key={index}>
                            <Button onClick={() => handlePageClick(parseInt(link.label))}
                                    className={activeClass}>{link.label}</Button>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}

const getPage = (url: string): string => {
    const defaultPage = '1';

    if (!url) return defaultPage;

    const queryString = url.split('?')[1];
    if (!queryString) return defaultPage;

    const pageParam = queryString
        .split('&')
        .find(param => param.startsWith('page='));
    if (!pageParam) return defaultPage;

    return pageParam.split('=')[1] || defaultPage;
}

